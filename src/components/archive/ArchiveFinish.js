import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {ARCHIVE_FINISH} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import UpLoading from './UpLoading'

class ArchiveFinish extends Component {

    componentWillReceiveProps(next) {
        const {actions} = this.props;
        const {archive} = next;
        const {action,actionResponse} = archive;
        if(action === 'update' && actionResponse){
            const {data} = actionResponse || {};
            actions.resetAction(data);
        }
    }

    finish(){
        const { params} = this.props;
        const { id} = params;
        const {syncActions} = this.props;
        syncActions.request(ARCHIVE_FINISH,{id});
    }

    render() {
        const { params} = this.props;
        const { id} = params;
        const { archive} = this.props;
        const { response} = archive;
        const { data} = response||{};
        const { finishState} = data||{};
        let btns;
        if(finishState === 0){
            btns = (<div className="formArch" style={{ height:40 }}><input type="button" value="提交" onClick={this.finish.bind(this)} className="addPerson"/></div>)
        }
        return (
            <div>
                <div className="title-form-name">结案</div>
                <div className="formBorder">
                    <div className="formArch word-title">协议书扫描件</div>
                    <div className="formArch"><UpLoading className="btn-pop" dataId={id}/></div>
                    {btns}
                </div>
            </div>
        )
    }
}

ArchiveFinish.propTypes = {
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
export  default connect(select,actions)(ArchiveFinish);
