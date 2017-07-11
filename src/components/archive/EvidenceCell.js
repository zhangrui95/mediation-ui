import React, {Component, PropTypes} from "react";
import EvidenceView from "./EvidenceView";
import { Upload} from 'antd';

const fileList = [];

function beforeUpload(file) {
    const isJPG = true;
    // const isJPG = file.type === 'image/jpeg';
    // if (!isJPG) {
    //     console.log('You can only upload JPG file!');
    // }
    console.log('upload type',file.type);
    console.log('upload size',file.size);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        console.log('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

const videoProps = {
    data:{aid:'xc'},
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'text',
    showUploadList: false,
    defaultFileList: [...fileList],
    className: 'upload-list-inline',
    withCredentials: true,
    beforeUpload: beforeUpload,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log('info',info);
        }
        if (info.file.status === 'done') {
            console.log(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
    }
};

class EvidenceCell extends Component {

    render() {
        const {data,reload} = this.props;
        return (
                <div className="formBorder gray-border">
                    <div className="formArch">
                        <div className="margin-form table-name">视频</div>
                        <dic className="list-right"><Upload {...videoProps}>上传视频</Upload></dic>
                    </div>
                    <EvidenceView data={data} type={0} reload={reload}/>
                    <div className="formArch">(以上格式为：RM,MVB,WMV,AVI,MP4,3GP,MKV,单个文件大小不得大于20M,全部大小不得大于100M。)</div>
                    <div className="formArch">
                        <div className="margin-form table-name">照片</div>
                        <dic className="list-right"><Upload {...videoProps}>上传照片</Upload></dic>
                    </div>
                    <EvidenceView data={data} type={1} reload={reload}/>
                    <div className="formArch">(以上格式为：JPEG(*.JPG *.JPEG *.JPE),PNG,单个文件大小不得大于2M,全部大小不得大于10M。)</div>
                    <div className="formArch">
                        <div className="margin-form table-name">录音</div>
                        <dic className="list-right"><Upload {...videoProps}>上传录音</Upload></dic>
                    </div>
                    <EvidenceView data={data} type={2} reload={reload}/>
                    <div className="formArch">(以上格式为：MP3,WMA,FLAC,MMF,AMR,M4A,M4R,MP2，WAV,单个文件大小不得大于2M,全部大小不得大于10M。)</div>
                </div>
        )
    }
}

EvidenceCell.propTypes = {
    data: PropTypes.array,
    reload: PropTypes.func
};

export default EvidenceCell