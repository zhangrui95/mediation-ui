import React, { Component, PropTypes } from 'react'
import {getDateTime} from '../../utils/date';

class MediateRow extends Component {
    clickHandler(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push({
            pathname: '/archive/'+dataId+'/mediate/'+item.id,
            query:{ edit: true }
            // state: { fromDashboard: true }
        });
    }
    getDetail(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push('/archive/'+dataId+'/mediate/'+item.id);
    }
    render() {
        const {idx,item,litigants,workers} = this.props;
        let index = idx+1;
        let num = index>9?index:('0'+index);
        return (<tr className="odd">
            <td width="40">{num}</td>
            <td width="230">
                <a className="ellipsis" href="javascript:;" onClick={this.getDetail.bind(this)}>{getDateTime(item.mediateTime)}</a>
            </td>
            <td className="ellipsis">{item.address}</td>
            <td className="ellipsis">{litigants}</td>
            <td className="ellipsis">{workers}</td>
            <td><a onClick={this.clickHandler.bind(this)}>编辑</a><span> | </span><a>打印</a></td>
        </tr>)
    }
}

MediateRow.contextTypes = {
    router: PropTypes.object
};

export default MediateRow
