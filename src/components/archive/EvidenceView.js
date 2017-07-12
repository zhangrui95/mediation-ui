import React, { Component, PropTypes } from 'react'
import EvidenceRow from "./EvidenceRow";

class EvidenceView extends Component {

    render() {
        const {data,type,reload} = this.props;
        const name = type===0?'照片':(type===1?'录音':'视频');
        let previewHead;
        if(type===0){
            previewHead = <td>照片浏览</td>;
        }
        const rows = data.filter(i => i.type === type).map(function(it,i){
            return <EvidenceRow key={i} data={it} idx={i} type={type} reload={reload}/>
        });
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list table-list-evidence">
                <thead>
                <tr>
                    <td>序号</td>
                    <td>{name}名称</td>
                    {previewHead}
                    <td>大小</td>
                    <td>上传时间</td>
                    <td>上传人员</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

EvidenceView.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.number.isRequired,
    reload: PropTypes.func
};

export default EvidenceView