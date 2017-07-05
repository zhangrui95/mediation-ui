import React, { Component, PropTypes } from 'react'

class ArchiveDetail extends Component {

    render() {
        const { children } = this.props;
        return (
            <div>
                卷宗详情
            </div>
        )
    }
}

ArchiveDetail.propTypes = {
    children: PropTypes.node
};

export default ArchiveDetail
