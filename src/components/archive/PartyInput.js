import React, { Component, PropTypes } from 'react'
import { Input } from 'antd';
import Select from '../Select'

class PartyInput extends Component {
    render() {
        const {item,model} = this.props;
        const itemStyle = model === 1 ? 'margin-form-party': 'margin-form';
        let name;
        let sex;
        let nation;
        let age;
        let card;
        let address;
        let contact;
        if(model === 0){
            name = <Input className="text-input" placeholder="" />
            sex = <Select domain="sex" data={[{id:'1',name:'男'},{id:'2',name:'女'}]} head="请选择"  />
            nation = <Input className="text-input" placeholder="" style={{ width: 70 }}/>
            age = <Input className="text-input" placeholder="" style={{ width: 70 }} />
            card = <Input className="text-input" placeholder="" />
            address = <Input className="text-input" style={{ width: 400 }} placeholder="" />
            contact = <Input className="text-input" placeholder="" />
        } else if(model === 1){
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
            name = <Input className="text-input" placeholder="" value={item.name}/>
            sex = <Select domain="type.id" data={[{id:'1',name:'男'},{id:'2',name:'女'}]} head="请选择" value={item.sex} />
            nation = <Input className="text-input" placeholder="" style={{ width: 70 }} value={item.nation}/>
            age = <Input className="text-input" placeholder="" style={{ width: 70 }} value={item.age} />
            card = <Input className="text-input" placeholder="" value={item.card} />
            address = <Input className="text-input" style={{ width: 400 }} placeholder="" value={item.address} />
            contact = <Input className="text-input" placeholder="" value={item.contact}/>
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
            </div>
        )
    }
}
PartyInput.propTypes = {
    model: PropTypes.number,
    item: PropTypes.object
};

export default PartyInput