import React, { Component, PropTypes } from 'react'
import  SurveyList from './SurveyList'

class MediateList extends Component {

    render() {
        const { children } = this.props;
        return (
            <div>
                <div className="title-form-name">人民调解记录</div>
                <div className="formArch">
                    <dic className="list-right">新建</dic>
                </div>
                < SurveyList/>
            </div>
        )
    }
}
 
MediateList.propTypes = {
    children: PropTypes.node
};

export default MediateList
