import React, { Component, PropTypes } from 'react'
import {getDateTime} from '../../utils/date';

class MediateCell extends Component {
    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const	{router}	=	this.context;
            router.push('/archive/'+id+'/mediate/'+params.mid);
        }
    }
    render() {
        const {data,litigants,workers} = this.props;
        const arr = data.map((e,i) => {
            return (<tr className="odd" key={i}>
                <td width="40">{i+1}</td>
                <td width="230">
                    <a className="view-cell" href="javascript:;">{getDateTime(e.mediateTime)}</a>
                </td>
                <td>{e.address}</td>
                <td>{litigants}</td>
                <td>{workers}</td>
                <td><a onClick={this.clickHandler.bind(this)}>编辑</a><span> | </span><a>打印</a></td>
            </tr>);
        });
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
                </thead>
                <tbody>
                {arr}
                </tbody>
            </table>
        )
    }
}

MediateCell.contextTypes = {
    router: PropTypes.object
};

export default MediateCell
