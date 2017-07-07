import React, { Component, PropTypes } from 'react'
import { DatePicker } from 'antd';

class TimeChoice extends Component{
    render() {
        return (
            <div className="margin-form">
                <DatePicker/>
            </div>
        );
    }
}

export default TimeChoice;