/**
 * Created by Administrator on 2017/7/27 0027.
 */
import React, { Component, PropTypes } from 'react'

class EvidencePrint extends Component {
    constructor(props, context) {
        super(props, context);
        const { params} = props;
        const {mid} = params;
        this.state = {mid:mid}
    }

    getPrint(){
        window.print();
    }

    render() {
        let id = this.state.mid;
        return (
            <div>
                <div className="title-form-name" >证据照片</div>
                <div className="formBorder gray-border">
                    <div className="formArch word-title">证据照片</div>
                    <img className="evid-img" src={'api/evidence/photo.json?id='+id}/>
                </div>
                <div className="formArch btn-box print-btn" style={{ height:40 }}><input type="button" onClick={this.getPrint.bind(this)} className="change-btn" value="打印" /></div>
            </div>
        )
    }
}


export default EvidencePrint