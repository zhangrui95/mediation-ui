import React, { Component, PropTypes } from 'react'
class Main extends Component {

    render(){
        const {Banner,Form,PageList} = this.props;
        return (
            <div id="mainright">
                { Banner }
                { Form }
                { PageList }
            </div>
        )
    }
}

Main.propTypes = {
    Banner: PropTypes.node,
    Form: PropTypes.node,
    List: PropTypes.node
};

export default Main;