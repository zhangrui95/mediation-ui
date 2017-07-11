import React, { Component, PropTypes } from 'react'
import TimeChoice from './TimeChoice'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {CHECKVISIT_SAVE} from '../../constants/ActionTypes'
import {CHECKVISIT_DETAIL} from '../../constants/ActionTypes'
import {CHECKVISIT_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {getDateTime} from '../../utils/date';

class CheckVisit extends Component {
    constructor(props, context) {
        super(props, context);
        const { params} = props;
        const {id} = params;
        this.state = {model: id !== null && id !== undefined && id !== '' ? 1 : 0,input:'',date:''};
    }
    componentWillReceiveProps(next) {
        const {checkvisit} = this.props;
        const {response} = checkvisit;
        const {state,data} = response||{};
        if(state == 0){
            this.setState({model:1,input:data.content,date:data.visitTime});
        }
    }
    updateModel(){
        const { checkvisit} = this.props;
        const {response} = checkvisit;
        const {data} = response||{};
        this.setState({model:2,input:data.content,date:data.visitTime});
    }
    updateArchive(){
        this.setState({model:1});
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(CHECKVISIT_UPDATE,null,{id:id,content:this.state.input,visitTime:this.state.date});
    }

    inputChange(e){
        this.setState({input: e.target.value});
    }
    componentWillMount(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(CHECKVISIT_DETAIL,{id});
    }
    timeChange(date){
        this.setState({date: date.visitTime});
    }
    onSave(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(CHECKVISIT_SAVE,{id},this.state.input,this.state.date);
    }

    getLitigants(archive){
        const {response} = archive;
        const {data} = response||{};
        const {litigants}= data||{};
        const litigantsName = litigants.map((i)=>i.name).join(',');
        return litigantsName;
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
        if(response == null){
            return null;
        }

        if(model === 0){
            content = <Input type="textarea" rows={4} onKeyUp={this.inputChange.bind(this)}/>;
            time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
        }else if(model === 1){
            content = data.content;
            time = getDateTime(data.visitTime);
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="编辑"  onClick={this.updateModel.bind(this)}/><input type="button" value="打印" /></div>
        }else{
            content = <Input type="textarea" rows={4} onKeyUp={this.inputChange.bind(this)} defaultValue={this.state.input}/>;
            time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)} visittime={this.state.date}/>;
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
        checkvisitSave:state.checkvisitSave,
        checkvisit:state.checkvisit,
        checkvisitUpdate:state.checkvisitUpdate
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(CheckVisit);
