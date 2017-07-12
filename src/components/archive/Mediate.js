import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {MEDIATE_DETAIL} from '../../constants/ActionTypes'
import {MEDIATE_SAVE} from '../../constants/ActionTypes'
import {MEDIATE_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {getDateTime} from '../../utils/date';
import { Input } from 'antd';

class Mediate extends Component {
    constructor(props, context) {
        super(props, context);
        const { params} = props;
        const {mid} = params;
        this.state = {model: mid !== 'create'||null && mid !== undefined && mid !== '' ? 1 : 0,time:'',content:'',data:{}};
    }
    componentWillReceiveProps(next) {
        const {mediateDetail} = this.props;
        const {response} = mediateDetail;
        const {state,data} = response||{};
        const {mediateTime,content} = data||{};
        if(state == 0){
            this.setState({model:1,time:mediateTime,content:content});
        }
    }
    updateModel(){
        const { mediateDetail} = this.props;
        const {response} = mediateDetail;
        const {data} = response||{};
        const {mediateTime,content} = data||{};
        this.setState({model:2,time:mediateTime,content:content});
    }
    updateArchive(){
        this.setState({model:1});
        const {actions,params} = this.props;
        const {mid} = params;
        actions.request(MEDIATE_UPDATE,null,{mid:mid,mediateTime:this.state.time,content:this.state.content});
    }
    componentWillMount(){
        const {actions,params} = this.props;
        const {mid} = params;
        actions.request(MEDIATE_DETAIL,{mid});
    }
    timeChange(e){
        this.setState({time:e.target.value});
    }
    contentChange(e){
        this.setState({content:e.target.value});
    }
    onSave(){
        const {actions,params} = this.props;
        const {mid} = params;
        actions.request(MEDIATE_SAVE,null,{mid:mid,mediateTime:this.state.time,content:this.state.content});
    }
    getLitigants(archive){
        const {response} = archive;
        const {data} = response||{};
        const {litigants}= data||{};
        const litigantsName = litigants.map((i)=>i.name).join(',');
        return litigantsName;
    }
    render() {
        const { params,mediateDetail,archive} = this.props;
        const {response} = mediateDetail;
        const {data} =  response||{};
        const {mediateTime,address,content} = data||{};
        const litigantsName = this.getLitigants(archive);
        const model = this.state.model;
        let time = '';
        let contents = '';
        let btns = '';
        let sign = '';
        if(data == null){
            return null;
        }
        if(model === 0){
            time = <Input name="name" className="text-input"  style={{ width: 300 }} onKeyUp={this.timeChange.bind(this)} placeholder="" />
            contents =  <Input type="textarea" rows={4}  onKeyUp={this.contentChange.bind(this)}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
        }else if(model === 1){
            time = getDateTime(mediateTime);
            contents =  content;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="编辑"  onClick={this.updateModel.bind(this)}/><input type="button" value="打印" /></div>
            sign = <div>
                        <div className="formArch">当事人签字：</div>
                        <div className="formArch">调解人签字：</div>
                        <div className="formArch">记录人签字：</div>
                    </div>
        }else{
            time = <Input name="name" className="text-input"  style={{ width: 300 }} defaultValue={getDateTime(this.state.time)} onKeyUp={this.timeChange.bind(this)} placeholder="" />
            contents =  <Input type="textarea" rows={4} defaultValue={this.state.content} onKeyUp={this.contentChange.bind(this)}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
        }
        return (
            <div>
                <div className="title-form-name" id={params.mid}>调解详情</div>
                <div className="formBorder">
                    <div className="formArch">调查时间：<span>{time}</span></div>
                    <div className="formArch">调查地点：<span>{address}</span></div>
                    <div className="formArch">当事人：<span>{litigantsName}</span></div>
                    <div className="formArch">调解人：<span></span></div>
                    <div className="formArch">调查记录：<span>{contents}</span></div>
                    {sign}
                    {btns}
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


