import React, { Component, PropTypes } from 'react'

class PartyCell extends Component {
    render() {
        const { litigants } = this.props;
        let length = litigants.length;
        const arr = (litigants||[]).map(function (i,idx) {
            let style = '';
            if(idx == length-1){
                style = 'formArch'
            }else{
                style = 'formArch bottom-border'
            }
            return (<div className={style} key={idx}>
                <div className="margin-form-party"><span className="news-width">当事人姓名：</span><span  className="show-style" style={{ width: 90 }}>{i.name}</span></div>
                <div className="margin-form-party"><span className="news-width" style={{width:40}}>性别：</span><span  className="show-style" style={{ width: 65 }}>{i.sex === 1 ? '男':'女'}</span></div>
                <div className="margin-form-party"><span className="news-width" style={{width:40}}>民族：</span><span  className="show-style" style={{ width: 65 }}>{i.nation}</span></div>
                <div className="margin-form-party"><span className="news-width" style={{width:40}}>年龄：</span><span  className="show-style" style={{ width: 65 }}>{i.age}</span></div>
                <div className="margin-form-party"><span className="news-width">身份证号：</span><span  className="show-style">{i.card}</span></div>
                <div className="margin-form-party"><span className="news-width">单位/住址：</span><span className="address-width" style={{ width: 515 }}>{i.address}</span></div>
                <div className="margin-form-party"><span className="news-width">联系方式：</span><span  className="show-style">{i.contact}</span></div>
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
