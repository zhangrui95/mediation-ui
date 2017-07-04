import React, { Component, PropTypes } from 'react'
import UserInfoBox from './user/UserInfoBox';
import {IMG_LOGO_URL,APP_TITLE_NAME} from '../constants/Constant';

class Header extends Component {
    
    render(){
        return (
            <div className="main-top">
                <div className="index-logo">
                    <img src={IMG_LOGO_URL} height="56" width="56" />
                    <p className="logo-name">{APP_TITLE_NAME}</p>
                </div>
                <UserInfoBox/>
                <div className="cls"></div>
            </div>

        )
    }
}
export  default Header;