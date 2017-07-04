import React, { Component, PropTypes } from 'react'
import {getPathVal} from '../../utils/data'

class DateCell extends Component {

    render(){
        const {width,classes,data,dataKey,type} = this.props;
        const value = getPathVal(data,dataKey);
        const text = DateCell.getDateTime(value,type);
        return (
            <td width={width} className={classes} title={text}>
                {text}
            </td>
        )
    }

    static formatDataUnit(unit) {
        return unit < 10 ? '0' + unit : unit;
    }

    static getDateTime(ms, type) {
        if (ms == null) {
            return '';
        }
        const date = new Date(ms);
        const dateStr = date.getFullYear() + '-'
            + DateCell.formatDataUnit(date.getMonth() + 1) + '-'
            + DateCell.formatDataUnit(date.getDate());
        if (type == 'date') {
            return dateStr;
        }
        const timeStr = DateCell.formatDataUnit(date.getHours()) + ':'
            + DateCell.formatDataUnit(date.getMinutes()) + ':'
            + DateCell.formatDataUnit(date.getSeconds());
        if (type == 'time') {
            return timeStr;
        }
        return dateStr + ' ' + timeStr;
    }
}

DateCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    data: PropTypes.object,
    type: PropTypes.string,
    dataKey: PropTypes.string
};

export default DateCell;