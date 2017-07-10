/**
 * Created by Administrator on 2017/7/7 0007.
 */
import React, { Component, PropTypes } from 'react'
import PartyInput from './PartyInput'

class AddPartyinput extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 2};
    }
    getAdd() {
        this.setState({count: this.state.count + 1});
    }
    render() {
        const {data,model} = this.props;
        if(!data){
            return null;
        }
        const tables = data.map(function (it,i) {
            return <PartyInput key={i} model={model} item={it}/>
        });
        let submitBtn;
        if(model !== 1){
            submitBtn = <div className="formArch" style={{ height:40 }}><input type="button" onClick={this.getAdd.bind(this)} value="添加当事人" className="addPerson"/></div>
        }
        return (
            <div>
                {tables}
                {submitBtn}
            </div>
        )
    }
}

AddPartyinput.propTypes = {
    model: PropTypes.number,
    data: PropTypes.array
};


export default AddPartyinput