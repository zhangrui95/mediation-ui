import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {ARCHIVE_ADD,ARCHIVE_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import {getDateTime} from '../../utils/date';
import { Input } from 'antd';
import Select from '../Select'
import Pop from '../pop/Pop';
import PopMediator from './PopMediator'
import AddPartyinput from './AddPartyinput'
import merge from 'lodash/merge'
import PopAlertHtml from '../pop/PopAlertHtml';

class ArchiveDetail extends Component {
    constructor(props, context) {
        super(props, context);
        const { params,archive} = props;
        const {id} = params;
        const {response} = archive;
        const {data} = response || {};
        this.state = {addBox:false,model: id !== null && id !== undefined && id !== '' ? 1 : 0,data:merge({},ArchiveDetail.data2state(data||{})),msg:'',workersName:ArchiveDetail.getWorkersName(data)};
    }

    componentWillReceiveProps(next) {
        const {actions} = this.props;
        const {archive} = next;
        const {response,action,actionResponse} = archive;
        if(action === 'add' && response) {
            const {state, data} = response || {};
            if (state === 0) {
                const	{router}	=	this.context;
                router.replace('/archive/'+data.id);
                this.setState({model:1,data:merge({},ArchiveDetail.data2state(data)),workersName:ArchiveDetail.getWorkersName(data)});
            }
            actions.resetAction();
        }else if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,data:merge({},ArchiveDetail.data2state(data)),workersName:ArchiveDetail.getWorkersName(data)});
            }
            actions.resetAction(data);
        }else if(response){
            if(!this.state.data.id){
                const {data} = response || {};
                this.setState({data:merge({},ArchiveDetail.data2state(data||{})),workersName:ArchiveDetail.getWorkersName(data)});
            }
        }
    }

    static data2state(data){
        return {id:data.id,name:data.name,type:{id:(data.type||{}).id},state:data.state,
            manager:{id:(data.manager||{}).id},content:data.content,
            workerIds:ArchiveDetail.getWorkersValue(data),litigants:ArchiveDetail.getLitigants(data),litigantsDel:''};
    }

    upAddClick(){
        this.setState({addBox:true});
    }

    saveButtonClick(){
        return true;
    }

    getData(){
        this.state.data.litigants = [];
        return merge({},this.state.data,{litigants:this.refs.litigants.datas()})
    }

    addNewArchive(){
        const data = this.getData();
        if(!this.validate(data)){
            return
        }
        const {syncActions} = this.props;
        syncActions.request(ARCHIVE_ADD,null,data);
    }

    updateArchive(){
        const data = this.getData();
        if(!this.validate(data)){
            return
        }
        const {syncActions} = this.props;
        syncActions.request(ARCHIVE_UPDATE,null,data);
    }

    updateModel(){
        this.setState({model:2});
    }

    handleChange(name){
        return (e) =>{
            let newData;
            if(name.indexOf('.') !== -1){
                const names = name.split('.');
                newData = {[names[0]]:{[names[1]]:e.target.value}};
            }else{
                newData = {[name]:e.target.value};
            }
            this.setState({data: merge({},this.state.data,newData)});
        }
    }

    handleWorkersChange(e,value){
        this.setState({data: merge({},this.state.data,{workerIds:value.join(',')})});
    }

    handleLitigantChange(datas,delId){
        this.state.data.litigants = [];
        let litigantsDel = this.state.data.litigantsDel||'';
        if(delId && delId !== ''){
            litigantsDel += delId+',';
        }
        this.setState({data: merge({},this.state.data,{litigants:datas,litigantsDel})});
    }

    static validateLitigants(item, idx){
        const errs = [];
        if(!item.name || item.name === ''){
            errs.push('姓名不能为空');
        }
        if(!item.card || item.card === ''){
            errs.push('身份证号码不能为空');
        }
        if(!item.sex || item.sex === ''){
            errs.push('性别不能为空');
        }
        if(!item.nation || item.nation === ''){
            errs.push('民族不能为空');
        }
        if(!item.age || item.age === '' || item.age < 1){
            errs.push('年龄不能为空或小于1');
        }
        if(!item.address || item.address === ''){
            errs.push('单位/住址不能为空');
        }
        if(!item.contact || item.contact === ''){
            errs.push('联系方式不能为空');
        }
        return errs.length === 0 ?'':('当事人'+(idx+1)+':有'+errs.length+'处错误');
    }

    validate(data){
        if(!data.name || data.name === ''){
            this.setState({msg:'卷宗名称不能为空'});
            return false;
        }
        if(!data.type || !data.type.id || data.type.id === ''){
            this.setState({msg:'请选择卷宗类别'});
            return false;
        }
        if(!data.content || data.content === ''){
            this.setState({msg:'纠纷简要情况不能为空'});
            return false;
        }
        if(!data.manager || !data.manager.id || data.manager.id === ''){
            this.setState({msg:'请选择调解员'});
            return false;
        }
        if(!data.litigants || data.litigants.length < 2){
            this.setState({msg:'当事人不能小于2'});
            return false;
        }
        const litigants = (data.litigants||[]).map((it,i)=> ArchiveDetail.validateLitigants(it,i)).filter(i=>i!=='').join('<br/>');
        if(litigants !== ''){
            this.setState({msg:litigants});
            return false;
        }
        return true;
    }

    static getWorkersValue(data){
        let workerValue = '';
        if(data && data.workers){
            workerValue = (data.workers||[]).map(i=>(i.worker||{}).id||'').join(',');
        }
        return workerValue;
    }

    static getWorkersName(data){
        let workerValue = '';
        if(data && data.workers){
            workerValue = (data.workers||[]).map(i=>(i.worker||{}).name||'').join(',');
        }
        return workerValue;
    }

    static getLitigant(data){
        return {id:data.id,name:data.name,card:data.card,sex:data.sex,nation:data.nation,age:data.age,address:data.address,contact:data.contact};
    }

    static getLitigants(data){
        let litigants = [{},{}];
        if(data && data.litigants){
            litigants = (data.litigants||[]).map(i=>ArchiveDetail.getLitigant(i||{}));
        }
        return litigants;
    }

    renderByData(data,readData) {
        const { archive,header } = this.props;
        const {model} = this.state;
        const {response} = archive;
        const {state,protocol,check} = response||{};
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
        let workersName = '';
        let workers = '';
        let litigants = '';
        let manager = '';
        let btns;
        if(model === 0){
            name = <Input name="name" className="text-input" style={{ width: 350 }} placeholder="" value={data.name}  onChange={this.handleChange('name').bind(this)} maxLength={50}/>
            type = <Select name="type" domain="type.id" url="api/archiveType/options.json" head="请选择" value={(data.type||{}).id} onChangeHandler={this.handleChange('type.id').bind(this)} />
            content = <Input name="content" type="textarea" rows={4} value={data.content} onChange={this.handleChange('content').bind(this)}/>
            manager = <Select domain="manager.id" url="api/user/listByRole.json?role=2" head="请选择" value={(data.manager||{}).id} onChangeHandler={this.handleChange('manager.id').bind(this)}/>
            workersName = data.workersName;
            workers = <input className="btn-pop" onClick={this.upAddClick.bind(this)} type="button" value="选择"/>
            litigants = <AddPartyinput ref="litigants" model={model} data={data.litigants}  onChange={this.handleLitigantChange.bind(this)}/>
            creater = header.user.response.user.name;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.addNewArchive.bind(this)} className="addPerson"/></div>
        }else if(model === 1){
            if(state !== 0){
                return null;
            }
            name = data.name;
            type = data.type.name;
            content = data.content;
            manager = data.manager.name;
            if(data.workers){
                workers = data.workers.map((i)=>i.worker.name).join(',');
            }
            litigants = <AddPartyinput ref="litigants" model={model} data={data.litigants} onChange={this.handleLitigantChange.bind(this)}/>
            createTime = getDateTime(data.createTime);
            keepTime = getDateTime(data.keepTime);
            if(protocol){
                protoTime = getDateTime(protocol.createTime);
                if(data.state === -1){
                    failTime = protoTime;
                }
                protoText = protocol.content;
            }
            if(check){
                checkText = check.content
            }
            litigantsName = data.litigants.map((i)=>i.name).join(',');
            creater = data.creater.name;
            btns = <div className="formArch btn-box" style={{ height:40 }}><input type="button" className="change-btn" value="编辑" onClick={this.updateModel.bind(this)} /><input type="button" className="change-btn" value="打印" /></div>
        }else{
            if(state !== 0){
                return null;
            }
            name = <Input name="name" className="text-input" style={{ width: 350 }} placeholder="" value={data.name}  onChange={this.handleChange('name').bind(this)} maxLength={50}/>
            type = <Select domain="type.id" url="api/archiveType/options.json" head="请选择" value={(data.type||{}).id} onChangeHandler={this.handleChange('type.id').bind(this)} />
            content = <Input name="content" type="textarea" rows={4} value={data.content} onChange={this.handleChange('content').bind(this)}/>
            manager = <Select domain="manager.id" url="api/user/listByRole.json?role=2" head="请选择" value={(data.manager||{}).id} onChangeHandler={this.handleChange('manager.id').bind(this)}/>
            workersName = data.workersName;
            workers = <input className="btn-pop" onClick={this.upAddClick.bind(this)} type="button" value="选择"/>
            litigants = <AddPartyinput ref="litigants" model={model} data={data.litigants} onChange={this.handleLitigantChange.bind(this)}/>
            createTime = getDateTime(readData.createTime);
            keepTime = getDateTime(readData.keepTime);
            if(protocol){
                protoTime = getDateTime(protocol.createTime);
                if(readData.state === -1){
                    failTime = protoTime;
                }
                protoText = protocol.content;
            }
            if(check){
                checkText = check.content
            }
            litigantsName = data.litigants.map((i)=>i.name).join(',');
            creater = readData.creater.name;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
        }
        let workerValue = [];
        if(data.workerIds){
            workerValue = data.workerIds.split(',');
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
                        <div className="formArch word-title">当事人</div>
                        {litigants}
                    </div>
                    <div className="border-box">
                        <div className="formArch word-title">纠纷简要情况</div>
                        <div className="formArch">{content}</div>
                    </div>
                    <div className="border-box">
                        <div className="formArch word-title">调解员</div>
                        <div className="formArch">
                            <div className="margin-form">第一调解员：{manager}</div>
                        </div>
                        <div className="formArch">
                            <div className="margin-form">第二调解员：{workers}{workersName}
                                <Pop title="添加调解员" visible={this.state.addBox} closeHandlers={{save:this.saveButtonClick.bind(this)}} closeDoneHandler={()=>this.setState({addBox:false})}>
                                    <PopMediator domain="manager.id" url="api/user/listByRole.json?role=2" name="workers" onChangeHandler={this.handleWorkersChange.bind(this)} value={workerValue}/>
                                </Pop>
                            </div>
                        </div>
                    </div>
                    <div className="formArch"><span className="word-title">立卷人：</span><span>{creater}</span></div>
                    <div className="formArch"><span className="word-title">立卷时间：</span><span>{createTime}</span></div>
                    <div className="formArch"><span className="word-title">调解日期：</span><span>{protoTime}</span></div>
                    <div className="formArch"><span className="word-title">保管期限：</span><span>{keepTime}</span></div>
                    <div className="formArch"><span className="word-title">达成协议时间：</span><span>{protoTime}</span></div>
                    <div className="formArch"><span className="word-title">调解协议：</span><span>{protoText}</span></div>
                    <div className="formArch"><span className="word-title">协议履行情况：</span><span>{checkText}</span></div>
                    <div className="formArch"><span className="word-title">调解失败时间：</span><span>{failTime}</span></div>
                    <div className="formArch"><span className="word-title">当事人姓名：</span><span>{litigantsName}</span></div>
                    <div className="formArch"><span className="word-title">登记人：</span><span>{creater}</span></div>
                    <div className="formArch"><span className="word-title">登记日期：</span><span>{createTime}</span></div>
                    {btns}
                </div>
                <PopAlertHtml visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
            </div>
        )
    }

    render() {
        const { archive } = this.props;
        const {response} = archive;
        const readData = (response||{}).data;
        const {model} = this.state;
        let data;
        if(model === 1){
            data = readData;
        }else{
            data = this.state.data;
        }
        return this.renderByData(data,readData)
    }
}

ArchiveDetail.propTypes = {
    children: PropTypes.node
};

ArchiveDetail.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        archive:state.archive,
        header:state.header
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(arhciveActions, dispatch),
    }
}
export  default connect(select,actions)(ArchiveDetail);
