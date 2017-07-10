/**
 * Created by Administrator on 2017/7/7 0007.
 */
import React, { Component, PropTypes } from 'react'
import PartyInput from './PartyInput'

class AddPartyinput extends Component {
    constructor(props) {
        super(props);
        const {onChange} = props;
        this.onChange = onChange;
        this.state = {count: 2,datas:[]};
    }
    getAdd() {
        this.setState({count: this.state.count + 1});
    }

    onChangeHandler(i){
        return (data) =>{
            const datas = this.state.datas;
            datas[i] = data;
            this.setState({datas:datas})
            if(this.onChange){
                this.onChange(this.state.datas);
            }
        }
    }


    render() {
        const {data,model} = this.props;
        let tables;
        if(model===0){
            tables = [];
            const count = this.state.count;
            for(let i = 0;i < count;i++){
                tables.push(<PartyInput key={i} model={model} onChange={this.onChangeHandler(i).bind(this)}/>)
            }
        }else{
            if(!data){
                return null;
            }
            tables = data.map((it,i) =>{
                return <PartyInput key={i} model={model} item={it} onChange={this.onChangeHandler(i).bind(this)}/>
            });
        }
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