import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EvidenceCell from './EvidenceCell'
import {LIST_BY_ARCHIVE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'

class EvidenceList extends Component {
    componentWillMount(){
        this.load();
    }

    load(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(LIST_BY_ARCHIVE,{id});
    }

    render() {
        const { evidence ,params} = this.props;
        const {id} = params;
        const {response} = evidence;
        const {data} = response||{};
        if(data == null){
            return null;
        }
        return (
            <div>
                <div className="title-form-name">调查取证</div>
                <EvidenceCell data={data} dataId={id} reload={this.load.bind(this)}/>
            </div>
        )
    }
}

EvidenceList.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        evidence:state.evidence
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(EvidenceList);
