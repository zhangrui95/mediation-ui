import React, { Component, PropTypes } from 'react'

class Mediate extends Component {

    render() {
        const { children, params} = this.props;
        return (
            <div>
                <div className="title-form-name" id={params.mid}>调解详情</div>
                <div className="formBorder">
                    <div className="formArch">调查时间：<span>2017年07月02日 14:54</span></div>
                    <div className="formArch">调查地点：<span>清滨路</span></div>
                    <div className="formArch">当事人：<span>张旭</span></div>
                    <div className="formArch">调解人：<span>范仲淹</span></div>
                    <div className="formArch">调查记录：<span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX。</span></div>
                    <div className="formArch">当事人签字：</div>
                    <div className="formArch">调解人签字：</div>
                    <div className="formArch">记录人签字：</div>
                    <div className="formArch"><input type="button" value="编辑" className=""/><input type="button" value="打印" className=""/></div>
                </div>
            </div>
        )
    }
}

Mediate.propTypes = {
    children: PropTypes.node
};

export default Mediate
