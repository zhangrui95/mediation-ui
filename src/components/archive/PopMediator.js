/**
 * Created by Administrator on 2017/7/7 0007.
 */
import React, { Component, PropTypes } from 'react'
import { Checkbox } from 'antd';

class PopMediator extends Component {
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
     }
    render() {
        const { children, params} = this.props;
        console.log(params)
        return (
            <div>
                <div className="formArch"><Checkbox onChange={this.onChange.bind(this)}>张三</Checkbox></div>
                <div className="formArch"><Checkbox onChange={this.onChange.bind(this)}>张三</Checkbox></div>
                <div className="formArch"><Checkbox onChange={this.onChange.bind(this)}>张三</Checkbox></div>
                <div className="formArch"><Checkbox onChange={this.onChange.bind(this)}>张三</Checkbox></div>
                <div className="formArch" style={{ height:40 }}><input type="button" value="确定" className="addPerson"/></div>
            </div>
        )
    }
}

PopMediator.propTypes = {
    children: PropTypes.node
};

export default PopMediator