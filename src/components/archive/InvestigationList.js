import React, { Component, PropTypes } from 'react'

class InvestigationList extends Component {

    render() {
        const { children } = this.props;
        return (
            <div>
                调查列表
            </div>
        )
    }
}

InvestigationList.propTypes = {
    children: PropTypes.node
};

export default InvestigationList
