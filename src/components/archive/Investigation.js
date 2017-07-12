import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {INVESTIGATION_DETAIL} from '../../constants/ActionTypes'
import {INVESTIGATION_UPDATE} from '../../constants/ActionTypes'
import {INVESTIGATION_SAVE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {getDateTime} from '../../utils/date';
import Pop from '../pop/Pop';
import PopMediator from './PopMediator'
import { Input } from 'antd';
import merge from 'lodash/merge'

class Investigation extends Component {
    constructor(props, context) {
        super(props, context);
        const { params} = props;
        const {mid} = params;
        this.state = {addBox:false,model: mid !== 'create'||null && mid !== undefined && mid !== '' ? 1 : 0,time:'',address:'',otherPerson:'',targetPerson:'',content:'',data:{}};
    }
    componentWillReceiveProps(next) {
        const {investigationDetail} = this.props;
        const {response} = investigationDetail;
        const {state,data} = response||{};
        const {investTime,address,otherPerson,targetPerson,content} = data||{};
        if(state == 0){
            this.setState({model:1,time:investTime,address:address,otherPerson:otherPerson,targetPerson:targetPerson,content:content});
        }
    }
    upAddClick(){
        this.setState({addBox:true});
    }
    saveButtonClick(){
        return true;
    }
    handleWorkersChange(e,value){
        this.setState({data: merge(this.state.data,{workerIds:value.join(',')})});
    }
    updateModel(){
        const { investigationDetail} = this.props;
        const {response} = investigationDetail;
        const {data} = response||{};
        const {investTime,address,otherPerson,targetPerson,content} = data||{};
        this.setState({model:2,time:investTime,address:address,otherPerson:otherPerson,targetPerson:targetPerson,content:content});
    }
    updateArchive(){
        this.setState({model:1});
        const {actions,params} = this.props;
        const {mid} = params;
        actions.request(INVESTIGATION_UPDATE,null,{mid:mid,investTime:this.state.time,address:this.state.address,otherPerson:this.state.otherPerson,targetPerson:this.state.targetPerson,content:this.state.content});
    }

    componentWillMount(){
        const {actions,params} = this.props;
        const {mid} = params;
        actions.request(INVESTIGATION_DETAIL,{mid});
    }
    timeChange(e){
        this.setState({time:e.target.value});
    }
    addressChange(e){
        this.setState({address:e.target.value});
    }
    otherPersonChange(e){
        this.setState({otherPerson:e.target.value});
    }
    targetPersonChange(e){
        this.setState({targetPerson:e.target.value});
    }
    contentChange(e){
        this.setState({content:e.target.value});
    }
    onSave(){
        const {actions,params} = this.props;
        const {mid} = params;
        actions.request(INVESTIGATION_SAVE,null,{mid:mid,investTime:this.state.time,address:this.state.address,otherPerson:this.state.otherPerson,targetPerson:this.state.targetPerson,content:this.state.content});
    }
    getWorkers(archive){
        const {response} = archive;
        const {data} = response||{};
        let workerValue;
        if(data.workerIds){
            workerValue = data.workerIds.split(',');
        }else if(data.workers){
            workerValue = data.workers.map(i=>i.worker.id);
        }
        return workerValue;
    }
    render() {
        let times =  '';
        let addresss =  '';
        let otherPersons =  '';
        let targetPersons =  '';
        let contents =  '';
        let creatPerson = '';
        let sign = '';
        let btns = '';
        const model = this.state.model;
        const { archive , params,investigationDetail} = this.props;
        const {response} = investigationDetail;
        const {data,state} =  response||{};
        const {investTime,address,otherPerson,targetPerson,content} = data||{};
        const workerValue = this.getWorkers(archive);
        if(data == null){
            return null;
        }

        if(model === 0){
            times = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder="" onKeyUp={this.timeChange.bind(this)} />
            addresss = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder=""  onKeyUp={this.addressChange.bind(this)}/>
            otherPersons = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder="" onKeyUp={this.otherPersonChange.bind(this)}/>
            targetPersons = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder="" onKeyUp={this.targetPersonChange.bind(this)}/>
            creatPerson = <div className="formArch">调查人：<input type="button" value="选择" /> </div>
            contents =  <Input type="textarea" rows={4} onKeyUp={this.contentChange.bind(this)}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
        }else if(model === 1){
            times = getDateTime(investTime);
            addresss =  address;
            otherPersons =  otherPerson;
            targetPersons =  targetPerson;
            contents =  content;
            creatPerson = ''
            sign = <div>
                        <div className="formArch">被调查人签字：</div>
                        <div className="formArch">调查人签字：</div>
                    </div>
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="编辑"  onClick={this.updateModel.bind(this)}/><input type="button" value="打印" /></div>
        }else{
            times = <Input name="name" className="text-input"  style={{ width: 300 }} defaultValue={getDateTime(this.state.time)} placeholder="" />
            addresss = <Input name="name" className="text-input"  style={{ width: 300 }} defaultValue={this.state.address} placeholder="" />
            otherPersons = <Input name="name" className="text-input"  style={{ width: 300 }} defaultValue={this.state.otherPerson} placeholder="" />
            targetPersons = <Input name="name" className="text-input"  style={{ width: 300 }} defaultValue={this.state.targetPerson} placeholder="" />
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
            creatPerson = <div className="formArch">调查人：<input type="button" value="选择" onClick={this.upAddClick.bind(this)}/> </div>
            contents =  <Input type="textarea" rows={4} defaultValue={this.state.content}/>;
            sign = '';
        }
        return (
            <div>
                <div className="title-form-name" id={params.mid}>调解调查详情</div>
                <div className="formBorder">
                    <div className="formArch">调查时间：<span>{times}</span></div>
                    <div className="formArch">调查地点：<span>{addresss}</span></div>
                    <div className="formArch">参加人：<span>{otherPersons}</span></div>
                    <div className="formArch">被调查人：<span>{targetPersons}</span></div>
                    {creatPerson}
                    <Pop title="选择调查人" visible={this.state.addBox} closeHandlers={{save:this.saveButtonClick.bind(this)}} closeDoneHandler={()=>this.setState({addBox:false})}>
                        <PopMediator domain="manager.id" url="api/user/listByRole.json?role=2" name="workers" onChangeHandler={this.handleWorkersChange.bind(this)} value={workerValue}/>
                    </Pop>
                    <div className="formArch">调查记录：<span>{contents}</span></div>
                    {sign}
                    {btns}
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
        archive:state.archive,
        investigationDetail:state.investigationDetail,
        investigationSave:state.investigationSave,
        investigationUpdate:state.investigationUpdate
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(Investigation);
