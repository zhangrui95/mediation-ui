import React, { Component, PropTypes } from 'react'
import { Input } from 'antd';
import Select from '../Select'
import merge from 'lodash/merge'
import PopAlert from '../pop/PopAlert';

class PartyInput extends Component {

    constructor(props, context) {
        super(props, context);
        const {onRemove ,item} = props;
        this.onRemove = onRemove;
        this.state = {data:merge({},item||{}),msg:''};
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
            this.onRemove(item);
        }
    }

    getCard(e){
        let value = e.target.value;
        const cardValid = function (value) {
            let ex = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(19|2[0-9])((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
            let pattern = new RegExp(ex);
            if(!pattern.test(value)){
                return false;
            }
            let params = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            let checks = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
            let id=value;
            let sum = 0;
            for (var i = 0; i < 17; i++) {
                var tmp = id.charAt(i);
                sum += params[i] * tmp;
            }
            sum %= 11;
            let check;
            if (id.charAt(17) == 'x' || id.charAt(17) == 'X') {
                check = 10;
            } else {
                check = id.charAt(17);
            }
            return check == checks[sum];
        };
        if(!cardValid(value)){
            this.setState({msg:'请输入正确的身份证号码！'});
            return false;
        };
    }
    getContact(e){
        let contact = e.target.value;
        let phone = /^1[34578]\d{9}$/;
        if(phone.test(contact)==false){
            this.setState({msg:'请输入正确的手机号码！'});
            return false;
        };
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
            name = <Input className="text-input" placeholder="请输入当事人姓名" value={item.name} onChange={this.handleChange('name').bind(this)} maxLength={10}/>
            sex = <Select domain="sex" data={[{id:'1',name:'男'},{id:'2',name:'女'}]} head="请选择" value={item.sex+''} onChangeHandler={this.handleChange('sex').bind(this)}/>
            nation = <Input className="text-input" placeholder="例:汉" style={{ width: 60 }} value={item.nation} onChange={this.handleChange('nation').bind(this)} maxLength={20}/>
            age = <Input className="text-input" type="number" placeholder="例:30" style={{ width: 60 }} value={item.age} onChange={this.handleChange('age').bind(this)} />
            card = <Input className="text-input" placeholder="请输入身份证号码" value={item.card} onChange={this.handleChange('card').bind(this)} onBlur={this.getCard.bind(this)} maxLength={18}/>
            address = <Input className="text-input" style={{ width: 400 }} placeholder="请输入当事人单位/住址" value={item.address} onChange={this.handleChange('address').bind(this)} maxLength={200}/>
            contact = <Input className="text-input" placeholder="请输入11位手机号码" value={item.contact} onChange={this.handleChange('contact').bind(this)} onBlur={this.getContact.bind(this)} maxLength={30}/>
            remove = <div className={itemStyle}><a href="javascript:;" onClick={this.handleRemove.bind(this)} className="del-btn">删除</a></div>
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
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
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