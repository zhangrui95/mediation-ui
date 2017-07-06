import React, { Component, PropTypes } from 'react'

class MediateList extends Component {

    render() {
        const { children } = this.props;
        return (
            <div>
                调解列表
            </div>
        )
    }
}
 
MediateList.propTypes = {
    children: PropTypes.node
};

export default MediateList
