import React, { Component, PropTypes } from 'react'

class EvidenceImg extends Component {
    render() {
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list table-list-evidence">
                <thead>
                <tr>
                    <td>序号</td>
                    <td>照片名称</td>
                    <td>照片浏览</td>
                    <td>大小（M）</td>
                    <td>上传时间</td>
                    <td>上传人员</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr class="odd">
                    <td width="40">1</td>
                    <td width="180">
                        <a class="view-cell" href="javascript:;">图片1.png</a>
                    </td>
                    <td>
                        <img src="assets/images/index-logo.png"/>
                    </td>
                    <td>17.5</td>
                    <td>2017-07-03 14:56:03</td>
                    <td>李四</td>
                    <td><a>下载</a><span> | </span><a>删除</a><span> | </span><a>打印</a></td>
                </tr>
                <tr class="even">
                    <td width="40">2</td>
                    <td width="180">
                        <a class="view-cell" href="javascript:;">图片2.jpg</a>
                    </td>
                    <td>
                        <img src="assets/images/index-logo.png"/>
                    </td>
                    <td>8.2</td>
                    <td>2017-07-05 17:22:31</td>
                    <td>张三</td>
                    <td><a>下载</a><span> | </span><a>打印</a></td>
                </tr>
                </tbody>
            </table>
        )
    }
}


export default EvidenceImg