import React, { Component, PropTypes } from 'react'

class ArchiveHeader extends Component {
    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const div = e.target;
            const routeUrl = div.getAttribute('data-route')||'';
            const	{router}	=	this.context;
            router.push('archive/'+id+routeUrl);
        }
    }
    goBack(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const	{router}	=	this.context;
            router.push('/list/archive');
        }
    }
    render() {
        return (
            <div>
                <a className="go-first" onClick={this.goBack.bind(this)}>&lt;&lt;返回首页</a>
                <div className="archeader-box" onClick={this.clickHandler.bind(this)} >
                    <div data-route="" className="header-top">登记表</div>
                    <div data-route="/evidence" className="header-top">调查取证</div>
                    <div data-route="/applyFor" className="header-top">申请书</div>
                    <div data-route="/investigation" className="header-top">调查表</div>
                    <div data-route="/mediate" className="header-top">调解记录</div>
                    <div data-route="/protocol" className="header-top">协议书</div>
                    <div data-route="/checkVisit" className="header-top">回访记录</div>
                    <div data-route="/finish" className="header-top">完结</div>
                </div>
            </div>
        )
    }
}

ArchiveHeader.propTypes = {
    children: PropTypes.node
};

ArchiveHeader.contextTypes = {
    router: PropTypes.object
};

export default ArchiveHeader
