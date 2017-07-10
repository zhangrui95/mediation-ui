import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {ARCHIVE_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import PartyCell from './PartyCell'
import TimeChoice from './TimeChoice'
import DisputeCase from './DisputeCase'

class ApplyFor extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {applyTime:''};
    }

    componentWillReceiveProps(next) {
        const {actions} = this.props;
        const {archive} = next;
        const {action,actionResponse} = archive;
        if(action === 'update' && actionResponse){
            actions.resetAction();
        }
    }

    onChangeHandler(date){
        this.setState(date)
    }

    saveApply(){
        const {syncActions,params} = this.props;
        const {id} = params;
        if(id !== null && id !== undefined && id !== ''){
            syncActions.request(ARCHIVE_UPDATE,null,{id,applyTime:this.state.applyTime});
        }
    }

    render() {
        const { archive } = this.props;
        return (
            <div>
                <div className="title-form-name">人民调解申请书</div>
                <div className="formBorder">
                        <div className="border-box">
                            <div className="formArch">当事人</div>
                            <PartyCell/>
                        </div>
                        <div className="border-box">
                            <div className="formArch">纠纷简要情况</div>
                            <DisputeCase/>
                        </div>
                        <div className="formArch font-weight-word">人民调解委员会已将申请人民调解的相关规定告诉我，现自愿申请人民调解委员会进行调解。</div>
                        <div className="formArch">
                            <div className="margin-form">申请时间</div><TimeChoice name="applyTime" onChange={this.onChangeHandler.bind(this)}/>
                        </div>
                        <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.saveApply.bind(this)} className="addPerson"/></div>
                    </div>
            </div>
        )
    }
}

ApplyFor.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(arhciveActions, dispatch)
    }
}
export  default connect(select,actions)(ApplyFor);
