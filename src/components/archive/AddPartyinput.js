import React, { Component, PropTypes } from 'react'
import PartyInput from './PartyInput'
import merge from 'lodash/merge'

class AddPartyinput extends Component {
    constructor(props) {
        super(props);
        const {onChange,data} = props;
        this.onChange = onChange;
        this.state = {datas:merge([],data||[{},{}])};
        this.count = 0;
    }

    datas(){
        return this.state.datas.map((e, i) => {
            return this.refs['sub'+i].data();
        });
    }

    getAdd() {
        const datas = this.state.datas.map((e, i) => {
            return this.refs['sub'+i].data();
        });
        datas.push({});
        const newData = merge([],datas)
        this.setState({datas:newData});
        if(this.onChange){
            this.onChange(newData);
        }
    }

    remove(item) {
        const {key,id} = item;
        const datas = this.state.datas.map((e, idx) => {
            return this.refs['sub'+idx].data();
        });
        const newData = datas.filter(i => i.key !== key)
        this.setState({datas:newData});
        if(this.onChange){
            this.onChange(newData,id);
        }
    }

    update(){
        const datas = this.state.datas.map((e, idx) => {
            return this.refs['sub'+idx].data();
        });
        this.setState({datas:merge([],datas)});
        if(this.onChange){
            this.onChange(this.state.datas);
        }
    }

    render() {
        const {model} = this.props;
        const {datas} = this.state;
        const tables = datas.map((it,i) =>{
            if(!it.key){
                let key = it.id;
                if(!key){
                    key = 'new_'+ (this.count++);
                }
                it.key = key
            }
            return <PartyInput ref={'sub'+i} key={it.key} model={model} item={it} onRemove={this.remove.bind(this)}/>
        });
        let submitBtn;
        if(model !== 1){
            submitBtn = <div className="formArch" style={{ height:40 }}><input type="button" onClick={this.getAdd.bind(this)} value="添加当事人" className="addPerson"/></div>
        }
        return (
            <div onBlur={this.update.bind(this)}>
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