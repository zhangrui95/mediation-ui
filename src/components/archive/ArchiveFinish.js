import React, { Component, PropTypes } from 'react'
import UpLoading from './UpLoading'

class ArchiveFinish extends Component {

    render() {
        const { params} = this.props;
        const { id} = params;
        return (
            <div>
                <div className="title-form-name">完结</div>
                <div className="formBorder">
                    <div className="formArch">协议书扫描件<UpLoading dataId={id}/></div>
                    <div className="formArch" style={{ height:40 }}><input type="button" value="提交" className="addPerson"/></div>
                </div>
            </div>
        )
    }
}

ArchiveFinish.propTypes = {
};

export default ArchiveFinish
