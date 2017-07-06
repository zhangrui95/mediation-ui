import React, { Component, PropTypes } from 'react'

class Investigation extends Component {

    render() {
        const { children, params} = this.props;
        return (
            <div>
                调查详情 @ {params.mid}
            </div>
        )
    }
}

Investigation.propTypes = {
    children: PropTypes.node
};

export default Investigation
