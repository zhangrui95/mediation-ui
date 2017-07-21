import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {MEDIATE_DETAIL,MEDIATE_SAVE,MEDIATE_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as mediateDetailActions from '../../actions/mediateDetail'
import {getDateTime} from '../../utils/date';
import { Input } from 'antd';
import TimeChoice from './TimeChoice'
import PopAlert from '../pop/PopAlert';

class Mediate extends Component {
    constructor(props, context) {
        super(props, context);
        const { params,location} = props;
        const {mid} = params;
        const {query} = location;
        const {edit} = query||{};
        this.state = {model: mid !== 'create'&& mid !== null && mid !== undefined && mid !== '' ? (edit?2:1) : 0,time:'',content:'',defaultTime:getDateTime(new Date().getTime()),msg:''};
    }
    componentWillReceiveProps(next){
        const {actions,params} = this.props;
        const {mediateDetail} = next;
        const {response,action,actionResponse} = mediateDetail||{};
        if(action === 'add' && actionResponse) {
            const {state, data} = actionResponse || {};
            if (state === 0) {
                const	{router}	=	this.context;
                router.replace('/archive/'+params.id+'/mediate/'+data.id);
                this.setState({model:1,content:data.content,time:getDateTime(data.mediateTime)});
            }
            actions.resetAction(actionResponse);
        }else if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,content:data.content,time:getDateTime(data.mediateTime)});
            }
            actions.resetAction(actionResponse);
        }else if(response){
            const {state,data} = response||{};
            if(state === 0){
                this.setState({content:data.content,time:getDateTime(data.mediateTime)});
            }else{
                this.setState({content:'',time:''});
            }
        }
    }
    updateModel(){
        const { mediateDetail} = this.props;
        const {response} = mediateDetail;
        const {data} = response||{};
        this.setState({model:2,content:data.content,time:getDateTime(data.mediateTime)});
    }
    updateArchive(){
        if(!this.validate()){
            return
        }
        const {syncActions,mediateDetail} = this.props;
        const {response} = mediateDetail;
        const {data} = response||{};
        const applyTime = this.state.time;
        syncActions.request(MEDIATE_UPDATE,null,{id:data.id,content:this.state.content,mediateTime:applyTime===''?this.state.defaultTime:applyTime});
    }
    componentWillMount(){
        const {syncActions,params} = this.props;
        const {mid} = params;
        if(mid !== 'create'&& mid !== null && mid !== undefined && mid !== ''){
            syncActions.request(MEDIATE_DETAIL,{id:mid});
        }
    }
    timeChange(date){
        this.setState({time: date.mediateTime});
    }
    contentChange(e){
        this.setState({content:e.target.value});
    }
    onSave(){
        if(!this.validate()){
            return
        }
        const {syncActions,params} = this.props;
        const {id} = params;
        const applyTime = this.state.time;
        syncActions.request(MEDIATE_SAVE,null,{content:this.state.content,mediateTime:applyTime===''?this.state.defaultTime:applyTime,archive:{id}});
    }
    getLitigants(archive){
        const {response} = archive;
        const {data} = response||{};
        const {litigants}= data||{};
        return (litigants||[]).map((i)=>i.name).join(',');
    }
    getWorkers(archive){
        const {response} = archive;
        const {data} = response||{};
        const {workers,manager}= data||{};
        let wnames = (workers||[]).map((i)=>(i.worker||{}).name||'').join(',');
        if(wnames !== ''){
            wnames = ','+wnames;
        }
        return ((manager||{}).name||'')+wnames;
    }
    validate(){
        if(this.state.content === ''){
            this.setState({msg:'调解记录不能为空'});
            return false;
        }
        return true;
    }
    goBack(){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const	{router}	=	this.context;
            router.push('/archive/'+id+'/mediate');
        }
    }
    getFinish(archive){
        const {response} = archive;
        const {data} = response||{};
        const {finishState} = data||{}
        return finishState;
    }
    render() {
        const { params,mediateDetail,archive} = this.props;
        const {response} = mediateDetail;
        const {data} =  response||{};
        const {mediateTime,address,content} = data||{};
        const model = this.state.model;
        let time = '';
        let contents = '';
        let btns = '';
        let sign = '';
        if(model === 0){
            time = <TimeChoice name="mediateTime" onChange={this.timeChange.bind(this)} value={this.state.time} defaultValue={this.state.defaultTime}/>;
            contents =  <Input type="textarea" style={{ width: 600 }} rows={4} value={this.state.content} onChange={this.contentChange.bind(this)}/>;
            btns = <div className="formArch btn-box" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="change-btn"/><input type="button" value="取消" onClick={this.goBack.bind(this)} className="change-btn"/></div>
        }else if(model === 1){
            if(data === null || data === undefined){
                return null;
            }
            let cont = content.split('\n').map((i,k)=><p key={k}>{i}</p>);
            let editBtn;
            let btnBox = 'formArch btn-box print-btn';
            const finish = this.getFinish(archive);
            if(finish === 0){
                editBtn = <input type="button" className="change-btn" value="编辑" onClick={this.updateModel.bind(this)} />
                btnBox = 'formArch btn-box';
            }
            btns = <div className={btnBox} style={{ height:40 }}>{editBtn}<input type="button" className="change-btn" value="打印" /></div>
            time = <div className="margin-word">{getDateTime(mediateTime)}</div>;
            contents =  <div className="content-text">{cont}</div>;
            // sign = <div>
            //             <div className="formArch">当事人签字：</div>
            //             <div className="formArch">调解人签字：</div>
            //             <div className="formArch">记录人签字：</div>
            //         </div>
        }else{
            if(data === null || data === undefined){
                return null;
            }
            time = <TimeChoice name="mediateTime" onChange={this.timeChange.bind(this)} value={this.state.time} defaultValue={this.state.defaultTime}/>;
            contents =  <Input type="textarea" style={{ width: 600 }} rows={4} value={this.state.content} onChange={this.contentChange.bind(this)}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
        }
        return (
            <div>
                <div className="center-box">
                    <div className="top-left"></div>
                    <div className="top-right"></div>
                <div className="title-form-name" id={params.mid}>调解详情</div>
                <div className="formArch"><sapn className="goback" onClick={this.goBack.bind(this)}>返回列表</sapn></div>
                <div className="formBorder">
                    <div className="fixed-box"></div>
                    <div className="formArch"><div className="margin-form word-title find-style">调解时间：</div>{time}</div>
                    <div className="formArch"><div className="margin-form word-title find-style">调解地点：</div><div className="margin-word">清滨调解中心</div></div>
                    <div className="formArch"><div className="margin-form word-title find-style">当事人：</div><div className="margin-word">{this.getLitigants(archive)}</div></div>
                    <div className="formArch"><div className="margin-form word-title find-style">调解人：</div><div className="margin-word">{this.getWorkers(archive)}</div></div>
                    <div className="formArch"><div className="margin-form word-title find-style">调解记录：</div>{contents}</div>
                    {sign}
                    <div className="fixed-box"></div>
                </div>
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                </div>
                {btns}
                <div className="fixed-box"></div>
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
            </div>
        )
    }
}

Mediate.contextTypes = {
    router: PropTypes.object
};


function	select(state)	{
    return	{
        archive:state.archive,
        mediateDetail:state.mediateDetail
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(mediateDetailActions, dispatch)
    }
}

export  default connect(select,actions)(Mediate);


