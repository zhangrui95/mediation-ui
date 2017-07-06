import React, { Component, PropTypes } from 'react'

class CheckVisit extends Component {

    render() {
        const { children, params} = this.props;
        return (
            <div>
                回访
            </div>
        )
    }
}

CheckVisit.propTypes = {
    children: PropTypes.node
};

export default CheckVisit
