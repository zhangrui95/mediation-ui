import React, { Component, PropTypes } from 'react'
import TimeChoice from './TimeChoice'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {CHECKVISIT_SAVE,CHECKVISIT_DETAIL,CHECKVISIT_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as checkvisitActions from '../../actions/checkvisit'
import * as arhciveActions from '../../actions/arhcive'
import {getDateTime} from '../../utils/date';
import PopAlert from '../pop/PopAlert';

class CheckVisit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {model: 0,input:'',date:'',defaultTime:getDateTime(new Date().getTime()),msg:''};
    }
    componentWillReceiveProps(next) {
        const {actions,arhciveActions} = this.props;
        const {checkvisit} = next;
        const {response,action,actionResponse} = checkvisit||{};
        if(action === 'add' && actionResponse) {
            const {state, data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,input:data.content,date:getDateTime(data.visitTime)});
                arhciveActions.setCheck(data);
            }
            actions.resetAction(actionResponse);
        }else if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,input:data.content,date:getDateTime(data.visitTime)});
                arhciveActions.setCheck(data);
            }
            actions.resetAction(actionResponse);
        }else if(response){
            const {state,data} = response||{};
            if(state === 0){
                this.setState({model:1,input:data.content,date:getDateTime(data.visitTime)});
            }else{
                this.setState({model:0,input:'',date:''});
            }
        }
    }

    updateModel(){
        const { checkvisit} = this.props;
        const {response} = checkvisit;
        const {data} = response||{};
        this.setState({model:2,input:data.content,date:getDateTime(data.visitTime)});
    }
    updateArchive(){
        if(!this.validate()){
            return
        }
        const {syncActions,checkvisit} = this.props;
        const {response} = checkvisit;
        const {data} = response||{};
        const applyTime = this.state.date;
        syncActions.request(CHECKVISIT_UPDATE,null,{id:data.id,content:this.state.input,visitTime:applyTime===''?this.state.defaultTime:applyTime});
    }

    inputChange(e){
        this.setState({input: e.target.value});
    }
    componentWillMount(){
        const {syncActions,params} = this.props;
        const {id} = params;
        syncActions.request(CHECKVISIT_DETAIL,{id});
    }
    timeChange(date){
        this.setState({date: date.visitTime});
    }
    onSave(){
        if(!this.validate()){
            return
        }
        const {syncActions,params} = this.props;
        const {id} = params;
        const applyTime = this.state.date;
        syncActions.request(CHECKVISIT_SAVE,null,{content:this.state.input,visitTime:applyTime===''?this.state.defaultTime:applyTime,archive:{id}});
    }

    validate(){
        if(this.state.input === ''){
            this.setState({msg:'回访情况不能为空'});
            return false;
        }
        return true;
    }

    getLitigants(archive){
        const {response} = archive;
        const {data} = response||{};
        const {litigants}= data||{};
        return (litigants||[]).map((i)=>i.name).join(',');
    }
    render() {
        let time = '';
        let content = '';
        let btns = '';
        const model = this.state.model;
        const { archive ,checkvisit} = this.props;
        const {response} = checkvisit;
        const {data} = response||{};

        const litigantsName = this.getLitigants(archive);

        if(model === 0){
            content = <Input type="textarea" rows={4} onChange={this.inputChange.bind(this)} value={this.state.input}/>;
            time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)} value={this.state.date} defaultValue={this.state.defaultTime}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
        }else if(model === 1){
            if(data === null || data === undefined){
                return null;
            }
            content = data.content;
            time = getDateTime(data.visitTime);
            btns = <div className="formArch btn-box" style={{ height:40 }}><input type="button" className="change-btn" value="编辑"  onClick={this.updateModel.bind(this)}/><input className="change-btn" type="button" value="打印" /></div>
        }else{
            if(data === null || data === undefined){
                return null;
            }
            content = <Input type="textarea" rows={4} onChange={this.inputChange.bind(this)} value={this.state.input}/>;
            time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)} value={this.state.date} defaultValue={this.state.defaultTime}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
        }

        return (
            <div>
                <div className="title-form-name">人民调解回访记录</div>
                <div className="formBorder">
                    <div className="formArch"><span className="word-title">回访时间：</span>{time}</div>
                    <div className="formArch"><span className="word-title">被回访人：</span>{litigantsName}</div>
                    <div className="formArch"><span className="word-title">回访情况：</span>{content}</div>
                    {btns}
                </div>
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
            </div>
        )
    }
}

CheckVisit.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive,
        checkvisit:state.checkvisit
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        arhciveActions: bindActionCreators(arhciveActions, dispatch),
        actions: bindActionCreators(checkvisitActions, dispatch)
    }
}

export  default connect(select,actions)(CheckVisit);
