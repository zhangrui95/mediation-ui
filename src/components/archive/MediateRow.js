import React, { Component, PropTypes } from 'react'
import {getDateTime} from '../../utils/date';

class MediateRow extends Component {
    clickHandler(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push('/archive/'+dataId+'/mediate/'+item.id);
    }
    render() {
        const {idx,item,litigants,workers,} = this.props;
        return (<tr className="odd">
            <td width="40">{idx+1}</td>
            <td width="230">
                <a className="view-cell" href="javascript:;">{getDateTime(item.mediateTime)}</a>
            </td>
            <td>{item.address}</td>
            <td>{litigants}</td>
            <td>{workers}</td>
            <td><a onClick={this.clickHandler.bind(this)}>编辑</a><span> | </span><a>打印</a></td>
        </tr>)
    }
}

MediateRow.contextTypes = {
    router: PropTypes.object
};

export default MediateRow
