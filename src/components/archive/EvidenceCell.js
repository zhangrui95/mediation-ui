/**
 * Created by Administrator on 2017/7/7 0007.
 */
import React, { Component, PropTypes } from 'react'
import EvidenceView from './EvidenceView'
import EvideceImg from './EvideceImg'
import EvidenceRecord from './EvidenceRecord'

class EvidenceCell extends Component {
    render() {
        const {data} = this.props;
        return (
                <div className="formBorder gray-border">
                    <div className="formArch">
                        <div className="margin-form table-name">视频</div>
                        <dic className="list-right">上传视频</dic>
                    </div>
                    <EvidenceView data={data}/>
                    <div className="formArch">(以上格式为：RM,MVB,WMV,AVI,MP4,3GP,MKV,单个文件大小不得大于20M,全部大小不得大于100M。)</div>
                    <div className="formArch">
                        <div className="margin-form table-name">照片</div>
                        <dic className="list-right">上传照片</dic>
                    </div>
                    <EvideceImg data={data}/>
                    <div className="formArch">(以上格式为：JPEG(*.JPG *.JPEG *.JPE),PNG,单个文件大小不得大于2M,全部大小不得大于10M。)</div>
                    <div className="formArch">
                        <div className="margin-form table-name">录音</div>
                        <dic className="list-right">上传录音</dic>
                    </div>
                    <EvidenceRecord data={data}/>
                    <div className="formArch">(以上格式为：MP3,WMA,FLAC,MMF,AMR,M4A,M4R,MP2，WAV,单个文件大小不得大于2M,全部大小不得大于10M。)</div>
                </div>
        )
    }
}

EvidenceCell.propTypes = {
    children: PropTypes.node
};

export default EvidenceCell