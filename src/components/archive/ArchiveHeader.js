import React, { Component, PropTypes } from 'react'

class ArchiveHeader extends Component {

    render() {
        const { children } = this.props;
        return (
            <div>
                <div className="archeader-box">
                    <div className="header-top">登记表</div>
                    <div className="header-top">调查取证</div>
                    <div className="header-top">申请书</div>
                    <div className="header-top">调查表</div>
                    <div className="header-top">调查记录</div>
                    <div className="header-top">协议书</div>
                    <div className="header-top">回访记录</div>
                    <div className="header-top">完结</div>
                </div>
                { children }
            </div>
        )
    }
}

ArchiveHeader.propTypes = {
    children: PropTypes.node
};

export default ArchiveHeader
