import React, { Component, PropTypes } from 'react'
import { DatePicker } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as syncActions from '../../actions/syncAction'
import {getDateTime} from '../../utils/date';

class TimeChoice extends Component{
    onChange(date, dateString){
        this.handleChange('startValue', date, dateString);
    }
    handleChange(field, value, dateString) {
        const {option,onChange} = this.props;
        onChange({[field=='startValue'?option.name1:option.name2]:dateString});
        this.setState({[field]: value});
    }
    
    render() {
        const { archive } = this.props;
        const {response} = archive;
        const {data} = response||{};
        let applyTime = data.applyTime;
        let html = '';
        let time = getDateTime(applyTime);
        if(applyTime==''){
            html = <div><div className="margin-form"><DatePicker onChange={this.onChange.bind(this)} format="YYYY-MM-DD HH:mm:ss"/></div></div>;
        }else{
            html = <div><div className="apply-name">申请人签字：</div><div className="time-right">{time}</div></div>;
        }

        return (
            <div>{html}</div>
        );
    }
}


function	select(state)	{
    return	{
        archive:state.archive,
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(TimeChoice);