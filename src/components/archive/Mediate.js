import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {MEDIATE_DETAIL} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {getDateTime} from '../../utils/date';

class Mediate extends Component {
    componentWillMount(){
        const {actions,params} = this.props;
        const {mid} = params;
        actions.request(MEDIATE_DETAIL,{mid});
    }

    render() {
        const { params,mediateDetail} = this.props;
        const {response} = mediateDetail;
        const {data} =  response||{};
        const {mediateTime,address,content} = data||{};
        if(data == null){
            return null;
        }
        let time = getDateTime(mediateTime);
        return (
            <div>
                <div className="title-form-name" id={params.mid}>调解详情</div>
                <div className="formBorder">
                    <div className="formArch">调查时间：<span>{time}</span></div>
                    <div className="formArch">调查地点：<span>{address}</span></div>
                    <div className="formArch">当事人：<span></span></div>
                    <div className="formArch">调解人：<span></span></div>
                    <div className="formArch">调查记录：<span>{content}</span></div>
                    <div className="formArch">当事人签字：</div>
                    <div className="formArch">调解人签字：</div>
                    <div className="formArch">记录人签字：</div>
                    <div className="formArch"><input type="button" value="编辑" className=""/><input type="button" value="打印" className=""/></div>
                </div>
            </div>
        )
    }
}

Mediate.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive,
        mediateDetail:state.mediateDetail
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(Mediate);


