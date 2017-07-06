import React, { Component, PropTypes } from 'react'
import ArchiveHeader from './../components/archive/ArchiveHeader'

class Archive extends Component {

    render() {
        const { children } = this.props;
        return (
            <div id="mainright">
                <ArchiveHeader {...this.props}/>
                { children }
            </div>
        )
    }
}

Archive.propTypes = {
    children: PropTypes.node
};

export default Archive
