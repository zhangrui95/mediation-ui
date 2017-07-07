import React, { Component, PropTypes } from 'react'

class Investigation extends Component {

    render() {
        const { children, params} = this.props;
        return (
            <div>
                <div className="title-form-name" id={params.mid}>调解详情</div>
                <div className="formBorder">
                    <div className="formArch">调查时间：<span>2017年07月02日 14:54</span></div>
                    <div className="formArch">调查地点：<span>清滨路</span></div>
                    <div className="formArch">参加人：<span>张旭</span></div>
                    <div className="formArch">被调查人：<span>范仲淹</span></div>
                    <div className="formArch">调查记录：<span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX。</span></div>
                    <div className="formArch">被调查人签字：</div>
                    <div className="formArch">调查人签字：</div>
                    <div className="formArch"><input type="button" value="编辑" className=""/><input type="button" value="保存" className=""/></div>
                </div>
            </div>
        )
    }
}

Investigation.propTypes = {
    children: PropTypes.node
};

export default Investigation
