/**
 * Created by Administrator on 2017/7/7 0007.
 */
import React, { Component, PropTypes } from 'react'
import { Input } from 'antd';

class PartyInput extends Component {
    render() {
        return (
            <div className="formArch">
                <div className="margin-form">姓名：<Input className="text-input" placeholder="" /></div>
                <div className="margin-form">性别：
                    <select defaultValue="男" style={{ width: 70 }}>
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </div>
                <div className="margin-form">民族：
                    <Input className="text-input" placeholder="" style={{ width: 70 }}/>
                </div>
                <div className="margin-form">年龄：<Input className="text-input" placeholder="" style={{ width: 70 }} /></div>
                <div className="margin-form">身份证号码：<Input className="text-input" placeholder="" /></div>
                <div className="margin-form">单位/住址：<Input className="text-input" style={{ width: 400 }} placeholder="" /></div>
                <div className="margin-form">联系方式：<Input className="text-input" placeholder="" /></div>
            </div>
        )
    }
}


export default PartyInput