import React, { Component, PropTypes } from 'react'
import { Input } from 'antd';
import Select from '../Select'
import merge from 'lodash/merge'
import PopAlert from '../pop/PopAlert';
import {cardValid} from './RegularValidator';
import PopConfirm from '../pop/PopConfirm'

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
        this.setState({msg:'确定删除此当事人？'});
        return false;
    }

    confirmOperation(){
        if(this.onRemove){
            const {item} = this.props;
            this.onRemove(item);
        }
    }

    getCard(e){
        let value = e.target.value;
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
        let styleName = '';
        if(model === 1){
            if(!item){
                return null;
            }
            name = <span className="show-style" style={{ width: 80 }}>{item.name}</span>
            sex = <span className="show-style" style={{ width: 40 }}>{(item.sex+'') === '1'? '男':'女'}</span>
            nation = <span className="show-style" style={{ width: 40 }}>{item.nation}</span>
            age = <span className="show-style" style={{ width: 40 }}>{item.age}</span>
            card = <span className="show-style">{item.card}</span>
            address = <span className="address-width" style={{ width: 460 }}>{item.address}</span>
            contact = <span className="show-style">{item.contact}</span>
            styleName = 'news-width';
        } else{
            if(!item){
                return null;
            }
            name = <Input style={{ width: 80 }} className="text-input" placeholder="" value={item.name} onChange={this.handleChange('name').bind(this)} maxLength={10}/>
            sex = <Select domain="sex" data={[{id:'1',name:'男'},{id:'2',name:'女'}]} head="请选择" value={item.sex+''} onChangeHandler={this.handleChange('sex').bind(this)}/>
            nation = <Input className="text-input" placeholder="" style={{ width: 40 }} value={item.nation} onChange={this.handleChange('nation').bind(this)} maxLength={20}/>
            age = <Input className="text-input" type="number" placeholder="" style={{ width: 40 }} value={item.age} onChange={this.handleChange('age').bind(this)} />
            card = <Input className="text-input" placeholder="" value={item.card} onChange={this.handleChange('card').bind(this)} onBlur={this.getCard.bind(this)} maxLength={18}/>
            address = <Input className="text-input" style={{ width: 395 }} placeholder="" value={item.address} onChange={this.handleChange('address').bind(this)} maxLength={200}/>
            contact = <Input className="text-input" placeholder="" value={item.contact} onChange={this.handleChange('contact').bind(this)} onBlur={this.getContact.bind(this)} maxLength={30}/>
            remove = <div className={itemStyle}><a href="javascript:;" onClick={this.handleRemove.bind(this)} className="del-btn">删除</a></div>
            styleName = 'news-width-margin';
        }
        return (
            <div className="formArch">
                <div className={itemStyle}><span className={styleName}>当事人姓名：</span>{name}</div>
                <div className={itemStyle}><span className={styleName} style={{width:40}}>性别：</span>{sex}</div>
                <div className={itemStyle}><span className={styleName} style={{width:40}}>民族：</span>{nation}</div>
                <div className={itemStyle}><span className={styleName} style={{width:40}}>年龄：</span>{age}</div>
                <div className={itemStyle}><span className={styleName}>身份证号：</span>{card}</div>
                <div className={itemStyle}><span className={styleName}>单位/住址：</span>{address}</div>
                <div className={itemStyle}><span className={styleName}>联系方式：</span>{contact}</div>
                {remove}
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
                <PopConfirm visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} information={this.state.msg}  onOk={this.confirmOperation.bind(this)}  closeDoneHandler={()=>this.setState({msg:""})}/>
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