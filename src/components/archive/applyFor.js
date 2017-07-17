import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {ARCHIVE_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import {getDateTime,getDate} from '../../utils/date';
import PartyCell from './PartyCell';
import TimeChoice from './TimeChoice';
import DisputeCase from './DisputeCase';
import PopAlert from '../pop/PopAlert';

class ApplyFor extends Component {

    constructor(props, context) {
        super(props, context);
        const { archive} = props;
        const {response} = archive;
        const {data} = response||{};
        const {applyTime} = data||{};
        this.state = {model: 0,applyTime:getDateTime(applyTime),defaultTime:getDateTime(new Date().getTime()),msg:''};
    }

    componentWillReceiveProps(next) {
        const {actions} = this.props;
        const {archive} = next;
        const {action,actionResponse,response} = archive;
        if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            const {applyTime} = data||{};
            if (state === 0) {
                this.setState({model:1,applyTime:getDateTime(applyTime),defaultTime:getDateTime(new Date().getTime())});
            }
            actions.resetAction(actionResponse.data);
        }else if(response){
            const {data} = response||{};
            const {applyTime} = data||{};
            this.setState({applyTime:getDateTime(applyTime)});
        }
    }

    onChangeHandler(date){
        this.setState(date)
    }

    saveApply(){
        const {syncActions,params} = this.props;
        const {id} = params;
        if(id !== null && id !== undefined && id !== ''){
            const applyTime = this.state.applyTime;
            syncActions.request(ARCHIVE_UPDATE,null,{id,applyTime:applyTime===''?this.state.defaultTime:applyTime});
        }
    }

    updateModel(){
        const { archive} = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {applyTime} = data||{};
        this.setState({model:2,applyTime:getDateTime(applyTime),defaultTime:getDateTime(new Date().getTime())});
    }

    getLitigants(){
        const { archive } = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {litigants} = data||{};
        return litigants||[];
    }

    render() {
        const { archive} = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {applyTime} = data||{};
        const model = this.state.model;
        let btns = '';
        let time = '';
        if(model === 0){
            btns =  <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.saveApply.bind(this)} className="addPerson"/></div>
            time = <div className="formArch">
                <div className="margin-form"><span className="word-title">申请时间：</span></div><TimeChoice name="applyTime" hide={0} onChange={this.onChangeHandler.bind(this)} value={this.state.applyTime}  defaultValue={this.state.defaultTime}/>
            </div>
        }else if(model === 1){
            btns = <div className="formArch btn-box" style={{ height:40 }}><input type="button" className="change-btn" value="编辑"  onClick={this.updateModel.bind(this)}/><input className="change-btn" type="button" value="打印" /></div>
            time = <div className="formArch" >
                        <div className="apply-name">申请人签字：</div>
                        <div className="time-right">
                            {getDate(applyTime)}
                        </div>
                    </div>;
        }else{
            btns =  <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.saveApply.bind(this)} className="addPerson"/></div>
            time = <div className="formArch">
                <div className="margin-form"><span className="word-title">申请时间：</span></div><TimeChoice name="applyTime" hide={0} onChange={this.onChangeHandler.bind(this)} value={this.state.applyTime}  defaultValue={this.state.defaultTime}/>
            </div>
        }
        return (
            <div>
                <div className="title-form-name">人民调解申请书</div>
                <div className="formBorder">
                        <div className="border-box">
                            <div className="formArch word-title">当事人</div>
                            <PartyCell litigants={this.getLitigants()}/>
                        </div>
                        <div className="border-box">
                            <div className="formArch word-title">纠纷简要情况</div>
                            <DisputeCase/>
                        </div>
                        <div className="formArch font-weight-word">人民调解委员会已将申请人民调解的相关规定告知我，现自愿申请人民调解委员会进行调解。</div>
                        {time}
                        {btns}
                    </div>
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
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
