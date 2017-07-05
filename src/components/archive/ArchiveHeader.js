import React, { Component, PropTypes } from 'react'

class ArchiveHeader extends Component {

    render() {
        const { children } = this.props;
        return (
            <div>
                卷宗菜单
                { children }
            </div>
        )
    }
}

ArchiveHeader.propTypes = {
    children: PropTypes.node
};

export default ArchiveHeader
