/**
 * Created by Administrator on 2017/7/6 0006.
 */
import React, { Component, PropTypes } from 'react'

class SurveyList extends Component {
    render() {
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list table-list-evidence">
                <thead>
                <tr>
                    <td>序号</td>
                    <td>调查时间</td>
                    <td>调查地点</td>
                    <td>参加人</td>
                    <td>被调查人</td>
                    <td>调查人</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr class="odd">
                    <td width="40">1</td>
                    <td width="230">
                        <a class="view-cell" href="javascript:;">2017-07-03 14:56:03</a>
                    </td>
                    <td>清滨路</td>
                    <td>张三</td>
                    <td>李四</td>
                    <td>张三</td>
                    <td><a>编辑</a><span> | </span><a>打印</a></td>
                </tr>
                <tr class="even">
                    <td width="40">2</td>
                    <td width="230">
                        <a class="view-cell" href="javascript:;">2017-07-03 14:56:03</a>
                    </td>
                    <td>红旗大街</td>
                    <td>张三</td>
                    <td>张三</td>
                    <td>李四</td>
                    <td><a>编辑</a><span> | </span><a>打印</a></td>
                </tr>
                </tbody>
            </table>
        )
    }
}


export default SurveyList