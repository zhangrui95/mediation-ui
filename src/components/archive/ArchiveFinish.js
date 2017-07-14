import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {ARCHIVE_FINISH} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import UpLoading from './UpLoading';
import PopAlert from '../pop/PopAlert';

class ArchiveFinish extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {msg:''};
    }
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
        const { params,archive} = this.props;
        const { id} = params;
        const { response} = archive;
        const { data} = response||{};
        const { protocolPath} = data||{};
        if(!protocolPath || protocolPath===''){
            this.setState({msg:'请上传协议书扫描件'});
            return false;
        }
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
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
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
