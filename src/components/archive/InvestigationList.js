import React, { Component, PropTypes } from 'react'
import  SurveyList from './SurveyList'

class InvestigationList extends Component {

    render() {
        const { children } = this.props;
        return (
            <div>
                <div className="title-form-name">人民调解调查表</div>
                <div className="formArch">
                    <dic className="list-right">新建</dic>
                </div>
                < SurveyList/>
            </div>
        )
    }
}

InvestigationList.propTypes = {
    children: PropTypes.node
};

export default InvestigationList
