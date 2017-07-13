import React, { Component, PropTypes } from 'react'
import {getDateTime} from '../../utils/date';

class SurveyRow extends Component {

    clickHandler(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push('/archive/'+dataId+'/investigation/'+item.id);
    }
    render() {
        const {idx,item} = this.props;
        return (<tr className="odd">
            <td width="40">{idx+1}</td>
            <td width="230">
                <a className="view-cell" href="javascript:;" onClick={this.clickHandler.bind(this)}>{getDateTime(item.investTime)}</a>
            </td>
            <td>{item.address}</td>
            <td>{item.otherPerson}</td>
            <td>{item.targetPerson}</td>
            <td>{(item.workers||[]).map(i=>(i.worker||{}).name||'').join(',')}</td>
            <td><a onClick={this.clickHandler.bind(this)}>编辑</a><span> | </span><a>打印</a></td>
        </tr>)
    }
}

SurveyRow.contextTypes = {
    router: PropTypes.object
};

export default SurveyRow