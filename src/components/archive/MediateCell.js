/**
 * Created by Administrator on 2017/7/10 0010.
 */
import React, { Component, PropTypes } from 'react'
import {getDateTime} from '../../utils/date';

class MediateCell extends Component {
    render() {
        const {data} = this.props;
        let arr = [];
        let address = '';
        let time = '';
        for(let i = 0; i < data.length; i++){
            address = data[i].address;
            time = getDateTime(data[i].mediateTime);
            arr.push(
                <tr className="odd" key={i}>
                    <td width="40">{i+1}</td>
                    <td width="230">
                        <a className="view-cell" href="javascript:;">{time}</a>
                    </td>
                    <td>{address}</td>
                    <td></td>
                    <td></td>
                    <td><a>编辑</a><span> | </span><a>打印</a></td>
                </tr>
            )
        }
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list table-list-evidence">
                <thead>
                <tr>
                    <td>序号</td>
                    <td>调查时间</td>
                    <td>调查地点</td>
                    <td>当事人</td>
                    <td>调解人</td>
                    <td>操作</td>
                </tr>
                {arr}
                </thead>
                <tbody>

                </tbody>
            </table>
        )
    }
}


export default MediateCell