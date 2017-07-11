import React, { Component, PropTypes } from 'react'
import PartyInput from './PartyInput'
import merge from 'lodash/merge'

class AddPartyinput extends Component {
    constructor(props) {
        super(props);
        const {onChange,data} = props;
        this.onChange = onChange;
        this.state = {datas:merge([],data||[{},{}])};
    }
    getAdd() {
        const datas = this.state.datas;
        datas.push({});
        this.setState({datas:merge([],datas)});
        if(this.onChange){
            this.onChange(this.state.datas);
        }
    }

    onChangeHandler(i){
        return (data) =>{
            const datas = this.state.datas;
            datas[i] = data;
            this.setState({datas:datas});
            if(this.onChange){
                this.onChange(this.state.datas);
            }
        }
    }


    render() {
        const {model} = this.props;
        const {datas} = this.state;
        const tables = datas.map((it,i) =>{
            return <PartyInput key={i} model={model} item={it} onChange={this.onChangeHandler(i).bind(this)}/>
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
    data: PropTypes.array,
    onChange: PropTypes.func
};


export default AddPartyinput