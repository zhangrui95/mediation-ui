import React, { Component, PropTypes } from 'react'
import  SurveyList from './SurveyList'

class InvestigationList extends Component {
    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const div = e.target;
            const routeUrl = div.getAttribute('data-route')||'';
            const	{router}	=	this.context;
            router.push('archive/'+id+routeUrl+'/'+params.id);
        }
    }
    render() {
        const { children } = this.props;
        return (
            <div>
                <div className="title-form-name">人民调解调查表</div>
                <div className="formArch">
                    <dic className="list-right" onClick={this.clickHandler.bind(this)}>新建</dic>
                </div>
                < SurveyList/>
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


export default InvestigationList
