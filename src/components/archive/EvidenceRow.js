import React, { Component, PropTypes } from 'react'
import {getDateTime} from '../../utils/date';

class EvidenceRow extends Component {

    static getHumanSize(size){
        if(size < 1024){
            return size +' B'
        }
        if(size < 1024*1024){
            return Math.round(size/1024) +' K'
        }
        return Math.round(size/1024/1024) +' M'
    }

    download(id){
        const {data} = this.props;
        window.open('/api/evidence/download.json?id='+data.id)
    }

    deleteEvidence(id){

    }

    printImg(id){

    }

    render() {
        const {data,type,idx} = this.props;
        let previewCell;
        let printImgPre;
        let printImgAction;
        let previewPreWidth = 230;
        if(type===1){
            previewPreWidth = 180;
            previewCell = <td>
                <img src="assets/images/index-logo.png"/>
            </td>;
            printImgPre = <span> | </span>
            printImgAction = <a onClick={this.printImg.bind(this)}>打印</a>
        }
        return (<tr className="odd">
            <td width="40">{idx}</td>
            <td width={previewPreWidth}>{data.name}</td>
            {previewCell}
            <td>{EvidenceRow.getHumanSize(data.size)}</td>
            <td>{getDateTime(data.createTime)}</td>
            <td>{data.creater.name}</td>
            <td><a onClick={this.download.bind(this)}>下载</a><span> | </span><a onClick={this.deleteEvidence.bind(this)}>删除</a>{printImgPre}{printImgAction}</td>
        </tr>)
    }
}

EvidenceRow.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.number.isRequired,
    idx: PropTypes.number.isRequired
};

export default EvidenceRow;