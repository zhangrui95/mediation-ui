/**
 * Created by Administrator on 2017/7/7 0007.
 */
import React, { Component, PropTypes } from 'react'
import PartyInput from './PartyInput'

var count = 0;
class AddPartyinput extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 2};
    }
    getAdd() {
        this.setState({count: this.state.count + 1});
    }
    render() {
        let tables = [];
        for (let i = 0; i < this.state.count; i++) {
            tables.push(<PartyInput key={i}/>);
        }
        return (
            <div>
                {tables}
                <div className="formArch" style={{ height:40 }}><input type="button" onClick={this.getAdd.bind(this)} value="添加当事人" className="addPerson"/></div>
            </div>
        )
    }
}


export default AddPartyinput