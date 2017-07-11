import React, { Component, PropTypes } from 'react'
import TimeChoice from './TimeChoice'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {CHECKVISIT_SAVE} from '../../constants/ActionTypes'
import {CHECKVISIT_DETAIL} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {getDateTime} from '../../utils/date';

class CheckVisit extends Component {
    constructor(props, context) {
        super(props, context);
        const { params} = props;
        const {id} = params;
        this.state = {model: id !== null && id !== undefined && id !== '' ? 1 : 0};
    }
    componentWillReceiveProps(next) {
        const {checkvisit} = this.props;
        const {response} = checkvisit;
        const {state} = response||{};
        if(state == 0){
            this.setState({model:1});
        }
    }
    updateModel(){
        this.setState({model:2});
    }

    updateArchive(){
        this.setState({model:1});
        const {actions} = this.props;
        actions.request(PROTOCOL_UPDATE);
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

    getLiname(archive){
        const {response} = archive;
        return
    }
    render() {
        let time = '';
        let content = '';
        const { archive ,checkvisit} = this.props;
        const {response} = checkvisit;
        const {data,state} = response||{};
        // const litigantsName = archive.response.data.litigants.map((i)=>i.name).join(',');
        const litigantsName = this.getLiname(archive);
        if(response == null){
            return null;
        }

        if(state == 0){
            content = data.content;
            time = getDateTime(data.visitTime);
        }else {
            content = <Input type="textarea" rows={4} onKeyUp={this.inputChange.bind(this)}/>;
            time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)}/>;
        }

        return (
            <div>
                <div className="title-form-name">人民调解回访记录</div>
                <div className="formBorder">
                    <div className="formArch"><div className="margin-form">回访时间：</div>{time}</div>
                    <div className="formArch">被回访人：{litigantsName}</div>
                    <div className="formArch"><div className="margin-form">回访情况：</div>{content}</div>
                    <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
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
        checkvisit:state.checkvisit
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(CheckVisit);
