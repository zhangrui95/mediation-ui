import React, { Component, PropTypes } from 'react'
import {getPathVal} from '../../utils/data'

class LinkCell extends Component {
    render(){
        const {width,classes,links,data,dataKey,maxLength} = this.props;
        const value = getPathVal(data,dataKey);
        let text = value;
        let linkName = '';
        if(maxLength!=null && text.length>maxLength){
            text = text.substring(0,maxLength)+'...';
        }
        if(text == 0){
            linkName = '中止';
        }
        const children = links.map(function(i){
            return <a title={text}>{linkName}</a>;
        });
        return (
            <td width={width} className={classes}>
                {children}
            </td>
        )
    }

}

LinkCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    links: PropTypes.array,
    data: PropTypes.object,
    maxLength: PropTypes.number,
    dataKey: PropTypes.string
};

export default LinkCell;