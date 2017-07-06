import React, { Component, PropTypes } from 'react'
import EvidenceView from './EvidenceView'
import EvideceImg from './EvideceImg'
import EvidenceRecord from './EvidenceRecord'
class EvidenceList extends Component {
    render() {
        return (
            <div>
                <div className="title-form-name">调查取证</div>
                <div className="formBorder gray-border">
                    <div className="formArch">
                        <div className="margin-form table-name">视频</div>
                        <dic className="list-right">上传视频</dic>
                    </div>
                    <EvidenceView/>
                    <div className="formArch">(以上格式为：RM,MVB,WMV,AVI,MP4,3GP,MKV,单个文件大小不得大于20M,全部大小不得大于100M。)</div>
                    <div className="formArch">
                        <div className="margin-form table-name">照片</div>
                        <dic className="list-right">上传照片</dic>
                    </div>
                    <EvideceImg/>
                    <div className="formArch">(以上格式为：JPEG(*.JPG *.JPEG *.JPE),PNG,单个文件大小不得大于2M,全部大小不得大于10M。)</div>
                    <div className="formArch">
                        <div className="margin-form table-name">录音</div>
                        <dic className="list-right">上传录音</dic>
                    </div>
                    <EvidenceRecord/>
                    <div className="formArch">(以上格式为：MP3,WMA,FLAC,MMF,AMR,M4A,M4R,MP2，WAV,单个文件大小不得大于2M,全部大小不得大于10M。)</div>
                </div>
            </div>
        )
    }
}

EvidenceList.propTypes = {
    children: PropTypes.node
};

export default EvidenceList
