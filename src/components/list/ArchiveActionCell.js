import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getPathVal} from '../../utils/data'
import {SUSPEND_WORK} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as arhciveActions from '../../actions/arhcive'

class ArchiveActionCell extends Component {

    componentDidUpdate() {
        const {actions,reload,archive} = this.props;
        const {response} = archive||{};
        const {state} = response||{};
        if(state === 0){
            actions.reset();
            if(reload){
                reload();
            }
        }
    }

    handClick(){
        if(confirm("确定中止该卷宗？")){
            const	{syncActions,data}	=	this.props;
            syncActions.request(SUSPEND_WORK,null,data.id,0);
        }
    }
    render(){
        const {width,classes,data,dataKey} = this.props;
        const value = getPathVal(data,dataKey);
        let linkName = '';
        if(value == 0){
            linkName = <a onClick={this.handClick.bind(this)}>下载</a>;
        }
        return (
            <td width={width} id={data.id} className={classes}>
                {linkName}
            </td>
        )
    }

}

ArchiveActionCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    links: PropTypes.array,
    data: PropTypes.object,
    maxLength: PropTypes.number,
    dataKey: PropTypes.string,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        archive:state.archive
    }
}

function mapDispatchToProps(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(arhciveActions, dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ArchiveActionCell);