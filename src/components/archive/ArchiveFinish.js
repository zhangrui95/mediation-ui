import React, { Component, PropTypes } from 'react'

class ArchiveFinish extends Component {

    render() {
        const { children, params} = this.props;
        return (
            <div>
                完结
            </div>
        )
    }
}

ArchiveFinish.propTypes = {
    children: PropTypes.node
};

export default ArchiveFinish
