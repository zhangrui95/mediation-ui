import React, { Component, PropTypes } from 'react'

class Protocol extends Component {

    render() {
        const { children, params} = this.props;
        return (
            <div>
                调解协议
            </div>
        )
    }
}

Protocol.propTypes = {
    children: PropTypes.node
};

export default Protocol
