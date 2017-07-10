import React, { Component, PropTypes } from 'react'
import TimeChoice from './TimeChoice'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {CHECKVISIT_SAVE} from '../../constants/ActionTypes'
import {CHECKVISIT_DETAIL} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {getDateTime} from '../../utils/date';

let input = '';
let content = '';
let time = '';
class CheckVisit extends Component {
    inputChange(e){
        input = e.target.value;
    }
    onSave(input){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(CHECKVISIT_SAVE,{id},input);
    }
    componentWillMount(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(CHECKVISIT_DETAIL,{id});
    }
    render() {
        let litigantsName = '';
        const { archive ,checkvisit} = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {litigants} = data||{}
        const text = checkvisit.response;
        if(text == null){
            return null;
        }
        if(text.content == ''){
            content = <Input type="textarea" rows={4} onKeyUp={this.inputChange.bind(this)}/>;
        }else{
            content = text.content;
        }
        if(text.visitTime == ''){
            time = <TimeChoice />;
        }else{
            time = getDateTime(text.visitTime);
        }
        litigantsName = data.litigants.map((i)=>i.name).join(',');
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
