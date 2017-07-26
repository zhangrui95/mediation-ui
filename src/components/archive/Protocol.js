import React, { Component, PropTypes } from 'react'
import  PartyCell from './PartyCell'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {PROTOCOL_DETAIL,PROTOCOL_SAVE,PROTOCOL_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as arhciveActions from '../../actions/arhcive'
import * as protocolActions from '../../actions/protocol'
import Select from '../Select'
import PopAlert from '../pop/PopAlert';

class Protocol extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {model: 0,result:'',content:'',remark:'',msg:''};
    }
    componentWillReceiveProps(next) {
        const {actions,arhciveActions} = this.props;
        const {protocol} = next;
        const {response,action,actionResponse} = protocol||{};
        if(action === 'add' && actionResponse) {
            const {state, data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,result:data.result+'',content:data.content,remark:data.remark});
                arhciveActions.setProtocol(data);
            }
            actions.resetAction(actionResponse);
        }else if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,result:data.result+'',content:data.content,remark:data.remark});
                arhciveActions.setProtocol(data);
            }
            actions.resetAction(actionResponse);
        }else if(response){
            const {state,data} = response||{};
            if(state === 0){
                this.setState({model:1,result:data.result+'',content:data.content,remark:data.remark});
            }else{
                this.setState({model: 0,result:'',content:'',remark:''});
            }
        }
    }

    updateModel(){
        const { protocol} = this.props;
        const {response} = protocol;
        const {data} = response||{};
        this.setState({model:2,result:data.result+'',content:data.content,remark:data.remark});
    }

    updateArchive(){
        if(!this.validate()){
            return
        }
        this.setState({model:1});
        const {syncActions,protocol} = this.props;
        const {response} = protocol;
        const {data} = response||{};
        syncActions.request(PROTOCOL_UPDATE,null,{id:data.id,result:this.state.result,content:this.state.content,remark:this.state.remark});
    }

    componentWillMount(){
        const {syncActions,params} = this.props;
        const {id} = params;
        syncActions.request(PROTOCOL_DETAIL,{id});
    }
    handleChange(e){
        const result = e.target.value;
        this.setState({result,content:result === '-1'?'未达成协议。':'',remark:''});
    }
    textChange(e){
        this.setState({content:e.target.value});
    }
    remarkChange(e){
        this.setState({remark:e.target.value});
    }
    onSave(){
        if(!this.validate()){
            return
        }
        const {syncActions,params} = this.props;
        const {id} = params;
        syncActions.request(PROTOCOL_SAVE,null,{result:this.state.result,content:this.state.content,remark:this.state.remark,archive:{id}});
    }
    getLitigants(){
        const { archive } = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {litigants} = data||{};
        return litigants||[];
    }

    getCode(){
        const { protocol } = this.props;
        const {response} = protocol;
        const {data} = response||{};
        const {code} = data||{};
        return code||'';
    }

    validate(){
        if(this.state.result === ''){
            this.setState({msg:'请选择调解结果'});
            return false;
        }
        if(this.state.content === ''){
            this.setState({msg:'调解协议不能为空'});
            return false;
        }
        if(this.state.result === '0' && this.state.remark === ''){
            this.setState({msg:'履行方式、时限不能为空'});
            return false;
        }
        return true;
    }
    getData(archive){
        const {response} = archive;
        const {data} = response||{};
        return data;
    }

    getPrint(){
        window.print();
    }

    render() {
        const model = this.state.model;
        const { archive ,protocol} = this.props;
        const {response} = protocol;
        const {data} = response||{};
        let resulttext = '';
        let remarktext = '';
        let contenttext = '';
        let btns = '';
        let disabled = '';
        if(model === 0){
            const archiveData = this.getData(archive);
            if(archiveData && archiveData.finishState === 0){
                btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
            }else{
                disabled = 'disabled';
            }
            remarktext = <Input type="textarea" disabled={this.state.result === '-1'||this.state.result === ''} rows={4}  placeholder="" value={this.state.remark} onChange={this.remarkChange.bind(this)}/>
            contenttext = <Input type="textarea" disabled={this.state.result === '-1'||this.state.result === ''} rows={4} onChange={this.textChange.bind(this)} value={this.state.content} />
            resulttext = <Select className="result-select" domain="result" data={[{id:'0',name:'调解成功'},{id:'-1',name:'调解失败'}]} head="请选择" disabled = {disabled} onChangeHandler={this.handleChange.bind(this)} value={this.state.result} />
        }else if(model === 1){
            if(!data){
                return null;
            }
            let editBtn;
            let btnBox = 'formArch btn-box print-btn';
            const archiveData = this.getData(archive)
            if(archiveData && archiveData.finishState === 0){
                editBtn = <input type="button" className="change-btn" value="编辑" onClick={this.updateModel.bind(this)} />
                btnBox = 'formArch btn-box';
            }
            btns = <div className={btnBox} style={{ height:40 }}>{editBtn}<input type="button" onClick={this.getPrint.bind(this)} className="change-btn" value="打印" /></div>
            let contents = data.content.split('\n').map((i,k)=><p key={k}>{i}</p>);
            remarktext = <div className="content-indent">{data.remark}</div>;
            contenttext = <div className="content-indent">{contents}</div>;
            resulttext = <div className="content-indent">{data.result === 0 ? '调解成功':'调解失败'}</div>;
        }else{
            if(!data){
                return null;
            }
            remarktext = <Input type="textarea"  disabled={this.state.result === '-1'||this.state.result === ''} rows={4}  placeholder="" value={this.state.remark} onChange={this.remarkChange.bind(this)}/>
            contenttext = <Input type="textarea" disabled={this.state.result === '-1'||this.state.result === ''} rows={4}  onChange={this.textChange.bind(this)} value={this.state.content}/>
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
            resulttext = <Select className="result-select" domain="result" data={[{id:'0',name:'调解成功'},{id:'-1',name:'调解失败'}]} value={this.state.result} head="请选择" onChangeHandler={this.handleChange.bind(this)}/>
        }
        return (
            <div>
                <div className="center-box">
                    <div className="top-left"></div>
                    <div className="top-right"></div>
                <div className="title-form-name">人民调解协议书</div>
                <div className="formArch word-title title-num"><div className="word-num">文号：<span>{this.getCode()}</span></div></div>
                <div className="formBorder">
                    <div className="fixed-box"></div>
                    <div className="border-box">
                        <div className="formArch word-title">当事人</div>
                        <PartyCell litigants={this.getLitigants()}/>
                    </div>
                    <div className="border-box">
                        <div className="formArch">
                            <div className="margin-form word-title margin-left-result">调解结果</div>
                        </div>
                        <div className="formArch">
                            {resulttext}
                        </div>
                    </div>
                    <div className="border-box">
                        <div className="formArch">
                                <div className="margin-form word-title find-style-left">调解协议</div>
                         </div>
                        <div className="formArch">
                            {contenttext}
                        </div>
                    </div>
                        <div className="formArch">
                                <div className="margin-form word-title find-style-left">履行方式、时限</div>
                        </div>
                    <div className="formArch">
                    {remarktext}
                    </div>
                    <div className="fixed-box"></div>
                 </div>
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                </div>
                {btns}
                <div className="fixed-box"></div>
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
            </div>
        )
    }
}

Protocol.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive,
        protocol:state.protocol,
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        arhciveActions: bindActionCreators(arhciveActions, dispatch),
        actions: bindActionCreators(protocolActions, dispatch)
    }
}
export  default connect(select,actions)(Protocol);

