import React, { Component, PropTypes } from 'react'
import {getDateTime} from '../../utils/date';

class SurveyRow extends Component {

    clickHandler(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push({
            pathname: '/archive/'+dataId+'/investigation/'+item.id,
            query:{ edit: true }
            // state: { fromDashboard: true }
        });
    }
    getDetail(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push('/archive/'+dataId+'/investigation/'+item.id);
    }
    render() {
        const {idx,item} = this.props;
        return (<tr className="odd">
            <td width="40">0{idx+1}</td>
            <td width="160">
                <a className="ellipsis" href="javascript:;" onClick={this.getDetail.bind(this)}>{getDateTime(item.investTime)}</a>
            </td>
            <td className="ellipsis">{item.address}</td>
            <td className="ellipsis">{item.otherPerson}</td>
            <td className="ellipsis">{item.targetPerson}</td>
            <td className="ellipsis">{(item.workers||[]).map(i=>(i.worker||{}).name||'').join(',')}</td>
            <td><a onClick={this.clickHandler.bind(this)}>编辑</a><span> | </span><a>打印</a></td>
        </tr>)
    }
}

SurveyRow.contextTypes = {
    router: PropTypes.object
};

export default SurveyRow
