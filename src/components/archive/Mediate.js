import React, { Component, PropTypes } from 'react'

class Mediate extends Component {

    render() {
        const { children, params} = this.props;
        return (
            <div>
                调解详情 @ {params.mid}
            </div>
        )
    }
}

Mediate.propTypes = {
    children: PropTypes.node
};

export default Mediate
