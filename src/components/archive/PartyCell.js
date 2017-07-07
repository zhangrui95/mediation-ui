/**
 * Created by Administrator on 2017/7/6 0006.
 */
import React, { Component, PropTypes } from 'react'
import { Input } from 'antd';

class PartyCell extends Component {
    render() {
        return (
            <div className="formArch">
                <div className="margin-form-party">姓名：<span>张鑫</span></div>
                <div className="margin-form-party">性别：<span>男</span></div>
                <div className="margin-form-party">民族：<span>汉</span></div>
                <div className="margin-form-party">年龄：<span>19</span></div>
                <div className="margin-form-party">身份证号码：<span>230105199507252527</span></div>
                <div className="margin-form-party">单位/住址：<span>哈尔滨道外区</span></div>
                <div className="margin-form-party">联系方式：<span>13636003725</span></div>
            </div>
        )
    }
}


export default PartyCell