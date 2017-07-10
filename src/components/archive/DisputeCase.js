/**
 * Created by Administrator on 2017/7/10 0010.
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as syncActions from '../../actions/syncAction'

class DisputeCase extends Component {
    render() {
        const { archive } = this.props;
        const {response} = archive;
        const {data} = response||{};
        return (
            <div className="formArch">{data.content}</div>
        )
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
export  default connect(select,actions)(DisputeCase);