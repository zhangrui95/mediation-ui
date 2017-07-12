import React, { Component, PropTypes } from 'react'
import { Input } from 'antd';
import Select from '../Select'
import merge from 'lodash/merge'

class PartyInput extends Component {

    constructor(props, context) {
        super(props, context);
        const {onRemove ,item} = props;
        this.onRemove = onRemove;
        this.state = {data:merge({},item||{})};
    }

    componentWillReceiveProps(next) {
        const {item} = next;
        this.setState({data:merge({},item||{})});
    }

    handleChange(name){
        return (e) =>{
            this.setState({data: Object.assign(this.state.data,{[name]:e.target.value})});
        }
    }

    data(){
        return this.state.data;
    }

    handleRemove(){
        if(this.onRemove){
            const {item} = this.props;
            this.onRemove(item.key);
        }
    }

    render() {
        const {model} = this.props;
        let item;
        if(model === 1){
            item = this.props.item;
        }else{
            item = this.state.data;
        }
        return this.renderByItem(item)
    }

    renderByItem(item) {
        const {model} = this.props;
        const itemStyle = model === 1 ? 'margin-form-party': 'margin-form';
        let name;
        let sex;
        let nation;
        let age;
        let card;
        let address;
        let contact;
        let remove;
        if(model === 1){
            if(!item){
                return null;
            }
            name = <span>{item.name}</span>
            sex = <span>{item.sex === 1 ? '男':'女'}</span>
            nation = <span>{item.nation}</span>
            age = <span>{item.age}</span>
            card = <span>{item.card}</span>
            address = <span>{item.address}</span>
            contact = <span>{item.contact}</span>
        } else{
            if(!item){
                return null;
            }
            name = <Input className="text-input" placeholder="" value={item.name} onChange={this.handleChange('name').bind(this)}/>
            sex = <Select domain="sex" data={[{id:'1',name:'男'},{id:'2',name:'女'}]} head="请选择" value={item.sex+''} onChangeHandler={this.handleChange('sex').bind(this)}/>
            nation = <Input className="text-input" placeholder="" style={{ width: 70 }} value={item.nation} onChange={this.handleChange('nation').bind(this)}/>
            age = <Input className="text-input" placeholder="" style={{ width: 70 }} value={item.age}onChange={this.handleChange('age').bind(this)} />
            card = <Input className="text-input" placeholder="" value={item.card} onChange={this.handleChange('card').bind(this)}/>
            address = <Input className="text-input" style={{ width: 400 }} placeholder="" value={item.address} onChange={this.handleChange('address').bind(this)}/>
            contact = <Input className="text-input" placeholder="" value={item.contact} onChange={this.handleChange('contact').bind(this)}/>
            remove = <div className={itemStyle}><a href="javascript:;" onClick={this.handleRemove.bind(this)}>删除</a></div>
        }
        return (
            <div className="formArch">
                <div className={itemStyle}>姓名：{name}</div>
                <div className={itemStyle}>性别：{sex}</div>
                <div className={itemStyle}>民族：{nation}</div>
                <div className={itemStyle}>年龄：{age}</div>
                <div className={itemStyle}>身份证号码：{card}</div>
                <div className={itemStyle}>单位/住址：{address}</div>
                <div className={itemStyle}>联系方式：{contact}</div>
                {remove}
            </div>
        )
    }
}
PartyInput.propTypes = {
    model: PropTypes.number,
    item: PropTypes.object,
    onRemove: PropTypes.func
};

export default PartyInput