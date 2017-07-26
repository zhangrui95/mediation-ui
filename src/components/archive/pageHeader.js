import React, { Component, PropTypes } from 'react'
import {IMG_LOGO_URL} from '../../constants/Constant';

class pageHeader extends Component {
    render() {
        return (
            <div>
                <div className="print-header-box">
                    <div className="border-header"></div>
                    <div className="word-title-box">
                        <div className="font-big">多一分<span className="large-font">谦让</span>和<span className="large-font">理解</span></div>
                        <img className="font-big logo-margin" src={IMG_LOGO_URL}/>
                        <div className="font-big">多一分<span className="large-font">宽容</span>和<span className="large-font">关爱</span></div>
                    </div>
                </div>
                <div className="print-bottom-box">
                    <div className="border-header"></div>
                    <div className="word-title-box-bottom">
                        <div className="font-big">哈尔滨市清滨人员调解</div>
                    </div>
                </div>
            </div>

        )
    }
}

export  default pageHeader;
