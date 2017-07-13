import React, { Component, PropTypes } from 'react'
import  PartyCell from './PartyCell'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {PROTOCOL_DETAIL,PROTOCOL_SAVE,PROTOCOL_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as protocolActions from '../../actions/protocol'
import Select from '../Select'

class Protocol extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {model: 0,result:'',content:'',remark:''};
    }
    componentWillReceiveProps(next) {
        const {actions} = this.props;
        const {protocol} = next;
        const {response,action,actionResponse} = protocol||{};
        if(action === 'add' && response) {
            const {state, data} = response || {};
            if (state === 0) {
                this.setState({model:1,result:data.result,content:data.content,remark:data.remark});
                this.setProtocol(data);
            }
            actions.resetAction();
        }else if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,result:data.result,content:data.content,remark:data.remark});
                this.setProtocol(data);
            }
            actions.resetAction(data);
        }else if(response){
            const {state,data} = response||{};
            if(state === 0){
                this.setState({model:1,result:data.result,content:data.content,remark:data.remark});
            }else{
                this.setState({model: 0,result:'',content:'',remark:''});
            }
        }
    }

    setProtocol(data){
        const { archive } = this.props;
        const {response} = archive;
        if(response){
            response.protocol = data;
        }
    }

    updateModel(){
        const { protocol} = this.props;
        const {response} = protocol;
        const {data} = response||{};
        this.setState({model:2,result:data.result,content:data.content,remark:data.remark});
    }

    updateArchive(){
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
        this.setState({result,content:result === '-1'?'未达成调解。':'',remark:''});
    }
    textChange(e){
        this.setState({content:e.target.value});
    }
    remarkChange(e){
        this.setState({remark:e.target.value});
    }
    onSave(){
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

    render() {
        const model = this.state.model;
        const { protocol} = this.props;
        const {response} = protocol;
        const {data} = response||{};
        let resulttext = '';
        let remarktext = '';
        let contenttext = '';
        let btns = '';
        if(model === 0){
            remarktext = <Input className="text-input" disabled={this.state.result === '-1'}  style={{ width: 400 }} placeholder="" value={this.state.remark} onChange={this.remarkChange.bind(this)}/>
            contenttext = <Input type="textarea" disabled={this.state.result === '-1'} rows={4} onChange={this.textChange.bind(this)} value={this.state.content} />
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
            resulttext = <Select domain="result" data={[{id:'0',name:'调解成功'},{id:'-1',name:'调解失败'}]} head="请选择" onChangeHandler={this.handleChange.bind(this)} value={this.state.result} />
        }else if(model === 1){
            remarktext = data.remark;
            contenttext = data.content;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" className="change-btn" value="编辑"  onClick={this.updateModel.bind(this)}/><input type="button" className="change-btn" value="打印" /></div>
            resulttext = data.result === 0 ? '调解成功':'调解失败';
        }else{
            remarktext = <Input className="text-input" disabled={this.state.result === '-1'}  style={{ width: 400 }} placeholder="" value={this.state.remark} onChange={this.remarkChange.bind(this)}/>
            contenttext = <Input type="textarea" disabled={this.state.result === '-1'} rows={4} onChange={this.textChange.bind(this)} value={this.state.content}/>
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
            resulttext = <Select domain="result" data={[{id:'0',name:'调解成功'},{id:'-1',name:'调解失败'}]} value={this.state.result} head="请选择" onChangeHandler={this.handleChange.bind(this)}/>
        }
        return (
            <div>
                <div className="title-form-name">人民调解协议书</div>
                <div className="formArch">文号：<span>{this.getCode()}</span></div>
                <div className="formBorder">
                    <div className="border-box">
                        <div className="formArch">当事人</div>
                        <PartyCell litigants={this.getLitigants()}/>
                    </div>
                    <div className="formArch">
                        <div className="margin-form">调解结果：
                            {resulttext}
                        </div>
                    </div>
                    <div className="formArch">调解协议：{contenttext}</div>
                    <div className="formArch">
                        <div className="margin-form">
                            履行方式、时限：{remarktext}
                        </div>
                    </div>
                    {btns}
                </div>
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
        actions: bindActionCreators(protocolActions, dispatch)
    }
}
export  default connect(select,actions)(Protocol);

