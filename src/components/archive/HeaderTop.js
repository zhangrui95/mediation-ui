/**
 * Created by Administrator on 2017/7/13 0013.
 */
import React, { Component, PropTypes } from 'react'

class HeaderTop extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {data,isActive,add} = this.props;
        let style = '';
        if(isActive){
            style = 'header-top tap-blue';
            if(add =="add"){
                style = 'header-top-gary tap-blue';
            }
        }else{
            if(add =="add"){
                style = 'header-top-gary';
            }else{
                style = 'header-top';
            }
        }
        return (
            <div
                className={style}
                data-route={data.route}
                data-index={data.index}>
                {data.name}
            </div>
        )
    }
}


export default HeaderTop