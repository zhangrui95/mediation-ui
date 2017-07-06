import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getPathVal} from '../../utils/data'
import {SUSPEND_WORK} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'

class LinkCell extends Component {
    handClick(e){
        var id = e.nativeEvent.target.parentNode.id;
        var con = confirm("确定中止该卷宗？");
        if(con == true){
            const	{actions}	=	this.props;
            actions.request(SUSPEND_WORK,null,id,0);
        }
    }
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
            return <a>{linkName}</a>;
        });
        return (
            <td width={width} id={data.id} className={classes}  onClick={this.handClick.bind(this)}>
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
    dataKey: PropTypes.string,
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export default connect(mapDispatchToProps)(LinkCell);