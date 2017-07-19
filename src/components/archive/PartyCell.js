import React, { Component, PropTypes } from 'react'

class PartyCell extends Component {
    render() {
        const { litigants } = this.props;
        const arr = (litigants||[]).map(function (i,idx) {
            return (<div className="formArch" key={idx}>
                <div className="margin-form-party"><span className="news-width">当事人姓名：</span><span>{i.name}</span></div>
                <div className="margin-form-party"><span className="news-width" style={{width:40}}>性别：</span><span>{i.sex === 1 ? '男':'女'}</span></div>
                <div className="margin-form-party"><span className="news-width" style={{width:40}}>民族：</span><span>{i.nation}</span></div>
                <div className="margin-form-party"><span className="news-width" style={{width:40}}>年龄：</span><span>{i.age}</span></div>
                <div className="margin-form-party"><span className="news-width">身份证号码：</span><span>{i.card}</span></div>
                <div className="margin-form-party"><span className="news-width">单位/住址：</span><span className="address-width">{i.address}</span></div>
                <div className="margin-form-party"><span className="news-width">联系方式：</span><span>{i.contact}</span></div>
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
