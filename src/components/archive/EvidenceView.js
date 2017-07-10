/**
 * Created by Administrator on 2017/7/6 0006.
 */
import React, { Component, PropTypes } from 'react'

class EvidenceCell extends Component {
    render() {
        const {data} = this.props;
        let name = ''
        let size = ''
        let type = ''
        let arr = [];
        let j = 0;
        for(let i = 0; i < data.length; i++){
            name = data[i].name;
            size = data[i].size;
            type = data[i].type;
            if(type == 0){
                j++;
                arr.push(
                    <tr className="odd" key={i}>
                        <td width="40">{j}</td>
                        <td width="230">
                            <a className="view-cell" href="javascript:;">{name}</a>
                        </td>
                        <td>{size}</td>
                        <td>2017-07-03 14:56:03</td>
                        <td>李四</td>
                        <td><a>下载</a><span> | </span><a>删除</a></td>
                    </tr>
                )
            }
        }
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list table-list-evidence">
                <thead>
                <tr>
                    <td>序号</td>
                    <td>视屏名称</td>
                    <td>大小（M）</td>
                    <td>上传时间</td>
                    <td>上传人员</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                    {arr}
                </tbody>
            </table>
        )
    }
}


export default EvidenceCell