import React, { Component, PropTypes } from 'react'
import TimeChoice from './TimeChoice'
import { Input } from 'antd';

class CheckVisit extends Component {

    render() {
        const { children, params} = this.props;
        return (
            <div>
                <div className="title-form-name">人民调解回访记录</div>
                <div className="formBorder">
                    <div className="formArch"><div className="margin-form">回访时间：</div><TimeChoice/></div>
                    <div className="formArch">被回访人：<Input className="text-input" placeholder="" /></div>
                    <div className="formArch"><div className="margin-form">回访情况：</div><Input type="textarea" rows={4} /></div>
                    <div className="formArch" style={{ height:40 }}><input type="button" value="保存" className="addPerson"/></div>
                </div>
            </div>
        )
    }
}

CheckVisit.propTypes = {
    children: PropTypes.node
};

export default CheckVisit
