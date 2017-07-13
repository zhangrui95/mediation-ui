/**
 * Created by Administrator on 2017/7/13 0013.
 */
import React, { Component, PropTypes } from 'react'

class HeaderTop extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {data,isActive} = this.props;
        return (
            <div
                className={isActive ? 'header-top tap-blue' : 'header-top'}
                data-route={data.route}
                data-index={data.index}>
                {data.name}
            </div>
        )
    }
}


export default HeaderTop