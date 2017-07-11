import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  SurveyList from './SurveyList'
import {INVESTIGATION_LIST} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'

class InvestigationList extends Component {
    componentWillMount(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(INVESTIGATION_LIST,{id});
    }
    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const div = e.target;
            const	{router}	=	this.context;
            router.push('archive/'+id+'/investigation');
        }
    }
    render() {
        const { investigation,params } = this.props;
        const {response} = investigation;
        const {data} = response||{};
        if(data == null){
            return null;
        }
        return (
            <div>
                <div className="title-form-name">人民调解调查表</div>
                <div className="formArch">
                    <dic className="list-right" onClick={this.clickHandler.bind(this)}>新建</dic>
                </div>
                < SurveyList params={params} data={data}/>
            </div>
        )
    }
}

InvestigationList.propTypes = {
    children: PropTypes.node
};

InvestigationList.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        investigation:state.investigation
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(InvestigationList);

