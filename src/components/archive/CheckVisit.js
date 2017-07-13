import React, { Component, PropTypes } from 'react'
import TimeChoice from './TimeChoice'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {CHECKVISIT_SAVE,CHECKVISIT_DETAIL,CHECKVISIT_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as checkvisitActions from '../../actions/checkvisit'
import {getDateTime} from '../../utils/date';

class CheckVisit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {model: 0,input:'',date:'',defaultTime:getDateTime(new Date().getTime())};
    }
    componentWillReceiveProps(next) {
        const {actions} = this.props;
        const {checkvisit} = next;
        const {response,action,actionResponse} = checkvisit||{};
        if(action === 'add' && response) {
            const {state, data} = response || {};
            if (state === 0) {
                this.setState({model:1,input:data.content,date:getDateTime(data.visitTime)});
                this.setCheck(data);
            }
            actions.resetAction();
        }else if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,input:data.content,date:getDateTime(data.visitTime)});
                this.setCheck(data);
            }
            actions.resetAction(data);
        }else if(response){
            const {state,data} = response||{};
            if(state === 0){
                this.setState({model:1,input:data.content,date:getDateTime(data.visitTime)});
            }else{
                this.setState({model:0,input:'',date:''});
            }
        }
    }

    setCheck(data){
        const { archive } = this.props;
        const {response} = archive;
        if(response){
            response.check = data;
        }
    }

    updateModel(){
        const { checkvisit} = this.props;
        const {response} = checkvisit;
        const {data} = response||{};
        this.setState({model:2,input:data.content,date:getDateTime(data.visitTime)});
    }
    updateArchive(){
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
        const {syncActions,params} = this.props;
        const {id} = params;
        const applyTime = this.state.date;
        syncActions.request(CHECKVISIT_SAVE,null,{content:this.state.input,visitTime:applyTime===''?this.state.defaultTime:applyTime,archive:{id}});
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
            content = <Input type="textarea" rows={4} onKeyUp={this.inputChange.bind(this)}/>;
            time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)} value={this.state.date} defaultValue={this.state.defaultTime}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
        }else if(model === 1){
            if(data === null || data === undefined){
                return null;
            }
            content = data.content;
            time = getDateTime(data.visitTime);
            btns = <div className="formArch" style={{ height:40 }}><input type="button" className="change-btn" value="编辑"  onClick={this.updateModel.bind(this)}/><input className="change-btn" type="button" value="打印" /></div>
        }else{
            if(data === null || data === undefined){
                return null;
            }
            content = <Input type="textarea" rows={4} onKeyUp={this.inputChange.bind(this)} defaultValue={this.state.input}/>;
            time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)} value={this.state.date} defaultValue={this.state.defaultTime}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
        }

        return (
            <div>
                <div className="title-form-name">人民调解回访记录</div>
                <div className="formBorder">
                    <div className="formArch"><div className="margin-form">回访时间：</div>{time}</div>
                    <div className="formArch">被回访人：{litigantsName}</div>
                    <div className="formArch"><div className="margin-form">回访情况：</div>{content}</div>
                    {btns}
                </div>
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
        actions: bindActionCreators(checkvisitActions, dispatch)
    }
}

export  default connect(select,actions)(CheckVisit);
