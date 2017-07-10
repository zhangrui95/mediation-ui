import React, { Component, PropTypes } from 'react'
import  PartyCell from './PartyCell'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {PROTOCOL_DETAIL} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'

class Protocol extends Component {
    componentWillMount(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(PROTOCOL_DETAIL,{id});
    }

    render() {
        const { children,params,protocol} = this.props;
        const {response} = protocol;
        const {remark} = response||{};
        return (
            <div>
                <div className="title-form-name" id={params.mid}>人民调解协议书</div>
                <div className="formArch">文号：<span>{remark}</span></div>
                <div className="formBorder">
                    <div className="border-box">
                        <div className="formArch">当事人</div>
                        <PartyCell/>
                    </div>
                    <div className="formArch">
                        <div className="margin-form">调解结果：
                            <select defaultValue="请选择" style={{ width: 70 }}>
                                <option value="0">调解成功</option>
                                <option value="-1">调解失败</option>
                            </select>
                        </div>
                    </div>
                    <div className="formArch">调解协议：<Input type="textarea" rows={4} /></div>
                    <div className="formArch">
                        <div className="margin-form">
                            履行方式、时限：<Input className="text-input" style={{ width: 400 }} placeholder="" />
                        </div>
                    </div>
                    <div className="formArch" style={{ height:40 }}><input type="button" value="保存" className="addPerson"/></div>
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
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(Protocol);

