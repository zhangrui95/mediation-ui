import React, { Component, PropTypes } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';

class TimeChoice extends Component{
    onChange(date, dateString){
        this.handleChange('startValue', date, dateString);
    }
    handleChange(field, value, dateString) {
        const {name,onChange} = this.props;
        onChange({[name]:dateString});
    }
    
    render() {
        const { value, defaultValue,hide} = this.props;
        let time = value;
        if(time === ''){
            time =  defaultValue;
        }
        let html;
        if(hide === 0){
            html = <div><div className="margin-form"><DatePicker showTime={true} onChange={this.onChange.bind(this)} defaultValue={moment(time,'YYYY-MM-DD')} format="YYYY-MM-DD" allowClear="false"/></div></div>;
        }else{
            html = <div>
                <div className="margin-form">
                    <DatePicker showTime={true} onChange={this.onChange.bind(this)} defaultValue={moment(time,'YYYY-MM-DD HH:mm:ss')} format="YYYY-MM-DD HH:mm:ss" allowClear="false"/>
                </div>
            </div>;
        }

        return (
            <div>{html}</div>
        );
    }
}
// if(value === ''){
//     html = <div><div className="margin-form"><DatePicker showTime={true} onChange={this.onChange.bind(this)} defaultValue={moment(time,'YYYY-MM-DD HH:mm:ss')} format="YYYY-MM-DD HH:mm:ss"/></div></div>;
// }else{
//     html = <div><div className="apply-name">申请人签字：</div><div className="time-right">
//         <DatePicker showTime={true} onChange={this.onChange.bind(this)} defaultValue={moment(time,'YYYY-MM-DD HH:mm:ss')} format="YYYY-MM-DD HH:mm:ss"/>
//     </div></div>;
// }
export  default TimeChoice;