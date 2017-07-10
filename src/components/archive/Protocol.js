import React, { Component, PropTypes } from 'react'
import  PartyCell from './PartyCell'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {PROTOCOL_DETAIL} from '../../constants/ActionTypes'
import {PROTOCOL_SAVE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'

let result = '';
let remark = '';
let content = '';
let resulttext = '';
let remarktext = '';
let contenttext = '';
class Protocol extends Component {
    componentWillMount(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(PROTOCOL_DETAIL,{id});
    }
    handleChange(e){
        result = e.target.value;
    }
    textChange(e){
        content = e.target.value;
    }
    remarkChange(e){
        remark = e.target.value;
    }
    onSave(result,content,remark){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(PROTOCOL_SAVE,{id},result,content,remark);
    }
    render() {
        const { children,params,protocol} = this.props;
        const {response} = protocol;
        const {remark,result,content} = response||{};
        if(remark == null){
            remarktext = <Input className="text-input" style={{ width: 400 }} placeholder="" onKeyUp={this.remarkChange.bind(this)}/>
        }else{
            remarktext = remark;
        }
        if(content == null){
            contenttext = <Input type="textarea" rows={4} onKeyUp={this.textChange.bind(this)}/>
        }else{
            contenttext = content;
        }
        if(result == 0){
            resulttext = "调解成功";
        }else if(result == -1){
            resulttext = "调解失败";
        }else{
            resulttext = <select defaultValue="请选择" style={{ width: 70 }} onChange={this.handleChange.bind(this)}>
                                <option>请选择</option>
                                <option value="0">调解成功</option>
                                <option value="-1">调解失败</option>
                           </select>
        }
        return (
            <div>
                <div className="title-form-name" id={params.mid}>人民调解协议书</div>
                <div className="formArch">文号：<span>XXXXXXXXXXXXXXXXXXXX</span></div>
                <div className="formBorder">
                    <div className="border-box">
                        <div className="formArch">当事人</div>
                        <PartyCell/>
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
                    <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
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
        protocol:state.protocol,
        protocolSave:state.protocolSave
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(Protocol);

