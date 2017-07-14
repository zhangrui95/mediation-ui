import React, { Component, PropTypes } from 'react'

class PartyCell extends Component {
    render() {
        const { litigants } = this.props;
        const arr = (litigants||[]).map(function (i,idx) {
            return (<div className="formArch" key={idx}>
                <div className="margin-form-party">姓名：<span>{i.name}</span></div>
                <div className="margin-form-party">性别：<span>{i.sex === 1 ? '男':'女'}</span></div>
                <div className="margin-form-party">民族：<span>{i.nation}</span></div>
                <div className="margin-form-party">年龄：<span>{i.age}</span></div>
                <div className="margin-form-party">身份证号码：<span>{i.card}</span></div>
                <div className="margin-form-party">单位/住址：<span>{i.address}</span></div>
                <div className="margin-form-party">联系方式：<span>{i.contact}</span></div>
            </div>);
        });
        return (
            <div>{arr}</div>
        )
    }
}

PartyCell.propTypes = {
    litigants: PropTypes.array.isRequired
};

export  default PartyCell;
