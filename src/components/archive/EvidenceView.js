/**
 * Created by Administrator on 2017/7/6 0006.
 */
import React, { Component, PropTypes } from 'react'
import {getDateTime} from '../../utils/date';

class EvidenceView extends Component {

    static getHumanSize(size){
        if(size < 1024){
            return size +' B'
        }
        if(size < 1024*1024){
            return Math.round(size/1024) +' K'
        }
        return Math.round(size/1024/1024) +' M'
    }

    render() {
        const {data,type} = this.props;
        const name = type===0?'视频':(type===1?'照片':'录音');
        let previewHead;
        let previewPreWidth = 230;
        if(type===1){
            previewHead = <td>照片浏览</td>;
            previewPreWidth = 180;
        }
        const rows = data.filter(i => i.type === type).map(function(it,i){
            let previewCell;
            let printImgPre;
            let printImgAction;
            if(type===1){
                previewCell = <td>
                    <img src="assets/images/index-logo.png"/>
                </td>;
                printImgPre = <span> | </span>
                printImgAction = <a>打印</a>
            }
            return (<tr className="odd" key={i}>
                <td width="40">{i}</td>
                <td width={previewPreWidth}>{it.name}</td>
                {previewCell}
                <td>{EvidenceView.getHumanSize(it.size)}</td>
                <td>{getDateTime(it.createTime)}</td>
                <td>{it.creater.name}</td>
                <td><a>下载</a><span> | </span><a>删除</a>{printImgPre}{printImgAction}</td>
            </tr>)
        });
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list table-list-evidence">
                <thead>
                <tr>
                    <td>序号</td>
                    <td>{name}名称</td>
                    {previewHead}
                    <td>大小</td>
                    <td>上传时间</td>
                    <td>上传人员</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

EvidenceView.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.number.isRequired
};

export default EvidenceView