import React, { Component, PropTypes } from 'react'
import UpLoading from './UpLoading'

class ArchiveFinish extends Component {

    render() {
        const { children, params} = this.props;
        return (
            <div>
                <div className="title-form-name">完结</div>
                <div className="formBorder">
                    <div className="formArch">协议书扫描件<UpLoading/></div>
                    <div className="formArch" style={{ height:40 }}><input type="button" value="提交" className="addPerson"/></div>
                </div>
            </div>
        )
    }
}

ArchiveFinish.propTypes = {
    children: PropTypes.node
};

export default ArchiveFinish
