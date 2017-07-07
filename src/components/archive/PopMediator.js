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
        return (
            <div>
                <div className="formArch"><Checkbox onChange={this.onChange.bind(this)}>张三</Checkbox></div>
                <div className="formArch"><Checkbox onChange={this.onChange.bind(this)}>张三</Checkbox></div>
                <div className="formArch"><Checkbox onChange={this.onChange.bind(this)}>张三</Checkbox></div>
                <div className="formArch"><Checkbox onChange={this.onChange.bind(this)}>张三</Checkbox></div>
                <div className="pop-submit">
                    <input type="button" name="button" data-close="save" value="保存"  className="btn-pop"/>
                    <input type="button" name="button" value="取消"  className="btn-reset" data-close="pop_cross"/>
                </div>
                <div className="error-height"></div>
            </div>
        )
    }
}

PopMediator.propTypes = {
    children: PropTypes.node
};

export default PopMediator