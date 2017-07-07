import React, { Component, PropTypes } from 'react'
import PartyCell from './PartyCell'
import TimeChoice from './TimeChoice'

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
                        <div className="border-box">
                            <div className="formArch">纠纷简要情况</div>
                            <div className="formArch">2016年11月7日下午，XXXXXXXXXXXXXXXXXXXXXXXXXXX。</div>
                        </div>
                        <div className="formArch">
                            <div className="margin-form">申请时间</div>
                            <TimeChoice/>
                        </div>
                        <div className="formArch">人民调解委员会已将申请人民调解的相关规定告诉我，现自愿申请人民调解委员会进行调解。</div>
                        <div className="formArch" style={{ height:40 }}><input type="button" value="保存" className="addPerson"/></div>
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
