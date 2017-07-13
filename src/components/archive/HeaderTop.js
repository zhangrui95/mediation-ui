/**
 * Created by Administrator on 2017/7/13 0013.
 */
import React, { Component, PropTypes } from 'react'

class HeaderTop extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {index:''};
    }
    handleClick(i) {
        this.setState({
            index: i,
        });
    }
    render() {
        const {data} = this.props;
        return (
            <div
                onClick={this.handleClick.bind(this,data.index)}
                className={this.state.index == data.index ? 'header-top tap-blue' : 'header-top'}
                data-route={data.route}>
                {data.name}
            </div>
        )
    }
}


export default HeaderTop