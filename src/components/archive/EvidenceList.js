import React, { Component, PropTypes } from 'react'

class EvidenceList extends Component {

    render() {
        const { children } = this.props;
        return (
            <div>
                证据列表
            </div>
        )
    }
}

EvidenceList.propTypes = {
    children: PropTypes.node
};

export default EvidenceList
