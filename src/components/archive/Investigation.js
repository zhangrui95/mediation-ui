import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {INVESTIGATION_DETAIL} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {getDateTime} from '../../utils/date';
import { Input } from 'antd';

class Investigation extends Component {
    constructor(props, context) {
        super(props, context);
        const { params} = props;
        const {id} = params;
        this.state = {addBox:false,passConfirm:false,goOutConfirm:false, model: id !== null && id !== undefined && id !== '' ? 1 : 0,data:{}};
    }

    componentWillMount(){
        const {actions,params} = this.props;
        const {mid} = params;
        actions.request(INVESTIGATION_DETAIL,{mid});
    }
    
    render() {
        let times =  '';
        let addresss =  '';
        let otherPersons =  '';
        let targetPersons =  '';
        let contents =  '';
        const { params,investigationDetail} = this.props;
        const {response} = investigationDetail;
        const {data,state} =  response||{};
        const {investTime,address,otherPerson,targetPerson,content} = data||{};
        if(data == null){
            return null;
        }
        if(state == 0){
            times = getDateTime(investTime);
            addresss =  address;
            otherPersons =  otherPerson;
            targetPersons =  targetPerson;
            contents =  content;
        }else{
            times = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder="" />
            addresss = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder="" />
            otherPersons = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder="" />
            targetPersons = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder="" />
        }

        return (
            <div>
                <div className="title-form-name" id={params.mid}>调解调查详情</div>
                <div className="formBorder">
                    <div className="formArch">调查时间：<span>{times}</span></div>
                    <div className="formArch">调查地点：<span>{addresss}</span></div>
                    <div className="formArch">参加人：<span>{otherPersons}</span></div>
                    <div className="formArch">被调查人：<span>{targetPersons}</span></div>
                    <div className="formArch">调查记录：<span>{contents}</span></div>
                    <div className="formArch">被调查人签字：</div>
                    <div className="formArch">调查人签字：</div>
                    <div className="formArch"><input type="button" value="编辑" className=""/><input type="button" value="打印" className=""/></div>
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
        investigationDetail:state.investigationDetail
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(Investigation);
