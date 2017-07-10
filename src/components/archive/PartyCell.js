/**
 * Created by Administrator on 2017/7/6 0006.
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as syncActions from '../../actions/syncAction'

class PartyCell extends Component {
    render() {
        const { archive } = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {litigants} = data||{};
        const {length} = litigants||{};
        let arr = [];
        for(let i = 0; i < length; i++){
            let sex = litigants[i].sex;
            let sexs ='';
            if(sex == 1){
                sexs = '男';
            }else{
                sexs = '女';
            }
            arr.push(
                <div className="formArch" key={i}>
                    <div className="margin-form-party">姓名：<span>{litigants[i].name}</span></div>
                    <div className="margin-form-party">性别：<span>{sexs}</span></div>
                    <div className="margin-form-party">民族：<span>{litigants[i].nation}</span></div>
                    <div className="margin-form-party">年龄：<span>{litigants[i].age}</span></div>
                    <div className="margin-form-party">身份证号码：<span>{litigants[i].card}</span></div>
                    <div className="margin-form-party">单位/住址：<span>{litigants[i].address}</span></div>
                    <div className="margin-form-party">联系方式：<span>{litigants[i].contact}</span></div>
                </div>
            )
        }
        return (
            <div>{arr}</div>
        )
    }
}

function	select(state)	{
    return	{
        archive:state.archive,
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(PartyCell);
