import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as syncActions from '../../actions/syncAction';
import {getDateTime} from '../../utils/date';
import { Input } from 'antd';
import Select from '../Select'
import Pop from '../pop/Pop';
import PopMediator from './PopMediator'
import AddPartyinput from './AddPartyinput'

class ArchiveDetail extends Component {
    constructor(props, context) {
        super(props, context);
        const { params} = props;
        const {id} = params;
        this.state = {addBox:false,passConfirm:false,goOutConfirm:false, model: id !== null && id !== undefined && id !== '' ? 1 : 0};
    };
    upAddClick(){
        this.setState({addBox:true});
    }
    saveButtonClick(){
        const addBox = this.refs.addBox;
        if(!addBox.check()){
            return false;
        }
        return false;
    }
    render() {
        const { archive,header } = this.props;
        const model = this.state.model;
        const {response} = archive;
        const {state,data,protocol,check} = response||{};

        let name;
        let type;
        let content;
        let creater;
        let createTime = '';
        let keepTime = '';
        let protoTime = '';
        let protoText = '';
        let checkText = '';
        let failTime = '';
        let litigantsName = '';
        let workers = '';
        let litigants = '';
        let manager = '';
        let btns;
        if(model === 0){
            name = <Input name="name" className="text-input"  style={{ width: 350 }} placeholder="" />
            type = <Select domain="type.id" url="api/archiveType/options.json" head="请选择"  />
            content = <Input name="content" type="textarea" rows={4} />
            creater = header.user.response.user.name;
            manager = <Select domain="manager.id" url="api/user/listByRole.json?role=2" head="请选择"  />
            workers = <input onClick={this.upAddClick.bind(this)} type="button" value="选择"/>
            litigants = <AddPartyinput model={model}/>
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" className="addPerson"/></div>
        }else if(model === 1){
            if(state !== 0){
                return null;
            }
            name = data.name;
            type = data.type.name;
            content = data.content;
            creater = data.creater.name;
            manager = data.manager.name;
            workers = data.workers.map((i)=>i.worker.name).join(',');
            litigants = <AddPartyinput model={model} data={data.litigants}/>
            createTime = getDateTime(data.createTime);
            keepTime = getDateTime(data.keepTime);
            if(data.state === -1){
                failTime = getDateTime(data.updateTime);
            }
            if(protocol){
                protoTime = getDateTime(protocol.createTime);
                protoText = protocol.content;
            }
            if(check){
                checkText = check.content
            }
            litigantsName = data.litigants.map((i)=>i.name).join(',');
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="编辑" /><input type="button" value="打印" /></div>
        }else{
            if(state !== 0){
                return null;
            }
            name = <Input name="name" className="text-input" style={{ width: 350 }} placeholder="" value={data.name} />
            type = <Select domain="type.id" url="api/archiveType/options.json" head="请选择" value={data.type.id}  />
            content = <Input name="content" type="textarea" rows={4} value={data.content} />
            creater = data.creater.name;
            manager = <Select domain="manager.id" url="api/user/listByRole.json?role=2" head="请选择" value={data.manager.id}  />
            workers = <input onClick={this.upAddClick.bind(this)} type="button" value="选择"/>
            litigants = <AddPartyinput model={model}/>
            createTime = getDateTime(data.createTime);
            keepTime = getDateTime(data.keepTime);
            if(data.state === -1){
                failTime = getDateTime(data.updateTime);
            }
            if(protocol){
                protoTime = getDateTime(protocol.createTime);
                protoText = protocol.content;
            }
            if(check){
                checkText = check.content
            }
            litigantsName = data.litigants.map((i)=>i.name).join(',');
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" className="addPerson"/></div>
        }
        return (
            <div>
                <div className="title-form-name">人民调解登记表</div>
                <div className="formBorder">
                    <div className="border-box">
                        <div className="formArch">
                            <div className="margin-form">卷宗名称：{name}</div>
                            <div className="margin-form">卷宗类别：{type}</div>
                        </div>
                    </div>
                    <div className="border-box">
                        <div className="formArch">当事人</div>
                        {litigants}
                    </div>
                    <div className="border-box">
                        <div className="formArch">纠纷简要情况</div>
                        <div className="formArch">{content}</div>
                    </div>
                    <div className="border-box">
                        <div className="formArch">调解员</div>
                        <div className="formArch">
                            <div className="margin-form">第一调解员：{manager}</div>
                        </div>
                        <div className="formArch">
                            <div className="margin-form">第二调解员：{workers}</div>
                        </div>
                    </div>
                    <div className="formArch">立卷人：<span>{creater}</span></div>
                    <div className="formArch">立卷时间：<span>{createTime}</span></div>
                    <div className="formArch">调解日期：<span>{protoTime}</span></div>
                    <div className="formArch">保管期限：<span>{keepTime}</span></div>
                    <div className="formArch">达成协议时间：<span>{protoTime}</span></div>
                    <div className="formArch">调解协议：<span>{protoText}</span></div>
                    <div className="formArch">协议履行情况：<span>{checkText}</span></div>
                    <div className="formArch">调解失败时间：<span>{failTime}</span></div>
                    <div className="formArch">当事人姓名：<span>{litigantsName}</span></div>
                    <div className="formArch">登记人：<span>{creater}</span></div>
                    <div className="formArch">登记日期：<span>{createTime}</span></div>
                    {btns}
                </div>
                <Pop title="添加调解员" visible={this.state.addBox} closeHandlers={{save:this.saveButtonClick.bind(this)}} closeDoneHandler={()=>this.setState({addBox:false})}>
                   <PopMediator/>
                </Pop>
            </div>
        )
    }
}

ArchiveDetail.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive,
        header:state.header
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(ArchiveDetail);
