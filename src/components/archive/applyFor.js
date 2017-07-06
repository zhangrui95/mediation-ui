import React, { Component, PropTypes } from 'react'
import { Input } from 'antd';
import PartyCell from './PartyCell'

class ApplyFor extends Component {

    render() {
        const { children } = this.props;
        return (
            <div>
                <div className="title-form-name">人民调解申请书</div>
                <div className="formBorder">
                    <div className="border-box">
                        <div className="border-box">
                            <div className="formArch">当事人</div>
                            <PartyCell/>
                            <PartyCell/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ApplyFor.propTypes = {
    children: PropTypes.node
};

export default ApplyFor
