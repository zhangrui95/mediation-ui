import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {INVESTIGATION_DETAIL} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {getDateTime} from '../../utils/date';

class Investigation extends Component {
    componentWillMount(){
        const {actions,params} = this.props;
        const {mid} = params;
        actions.request(INVESTIGATION_DETAIL,{mid});
    }
    
    render() {
        const { params,investigationDetail} = this.props;
        const {response} = investigationDetail;
        const {data} =  response||{};
        const {investTime,address,otherPerson,targetPerson,content} = data||{};
        if(data == null){
            return null;
        }

        let time = getDateTime(investTime);
        return (
            <div>
                <div className="title-form-name" id={params.mid}>调解调查详情</div>
                <div className="formBorder">
                    <div className="formArch">调查时间：<span>{time}</span></div>
                    <div className="formArch">调查地点：<span>{address}</span></div>
                    <div className="formArch">参加人：<span>{otherPerson}</span></div>
                    <div className="formArch">被调查人：<span>{targetPerson}</span></div>
                    <div className="formArch">调查记录：<span>{content}</span></div>
                    <div className="formArch">被调查人签字：</div>
                    <div className="formArch">调查人签字：</div>
                    <div className="formArch"><input type="button" value="编辑" className=""/><input type="button" value="打印" className=""/></div>
                </div>
            </div>
        )
    }
}

Investigation.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        investigationDetail:state.investigationDetail
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(Investigation);
