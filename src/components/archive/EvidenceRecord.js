/**
 * Created by Administrator on 2017/7/6 0006.
 */
import React, { Component, PropTypes } from 'react'

class EvidenceRecord extends Component {
    render() {
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list table-list-evidence">
                <thead>
                <tr>
                    <td>序号</td>
                    <td>录音名称</td>
                    <td>大小（M）</td>
                    <td>上传时间</td>
                    <td>上传人员</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr class="odd">
                    <td width="40">1</td>
                    <td width="230">
                        <a class="view-cell" href="javascript:;">录音1.mp3</a>
                    </td>
                    <td>17.5</td>
                    <td>2017-07-03 14:56:03</td>
                    <td>李四</td>
                    <td><a>下载</a><span> | </span><a>删除</a></td>
                </tr>
                <tr class="even">
                    <td width="40">2</td>
                    <td width="230">
                        <a class="view-cell" href="javascript:;">录音2.mp3</a>
                    </td>
                    <td>8.2</td>
                    <td>2017-07-05 17:22:31</td>
                    <td>张三</td>
                    <td id="2"><a>下载</a>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}


export default EvidenceRecord