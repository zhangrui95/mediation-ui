import React, {Component, PropTypes} from "react";
import EvidenceView from "./EvidenceView";
import { Upload} from 'antd';

const fileList = [];

const videoProps = {
    action: 'api/evidence/save.json',
    listType: 'text',
    showUploadList: false,
    defaultFileList: [...fileList],
    className: 'upload-list-inline',
    withCredentials: true
};

class EvidenceCell extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {state:0,show:0,text:'',count:0};
    }

    beforeUpload(file) {
        const isJPG = true;
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //     console.log('You can only upload JPG file!');
        // }
        console.log('upload type',file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;
        let text = '开始上传...';
        if (!isLt2M) {
            text = '文件大于2M';
        }
        this.setState({show:0,text});
        return isJPG && isLt2M;
    }

    onChangeHandler(info){
        // if (info.file.status !== 'uploading') {
        //     console.log('info',info);
        // }
        if (info.event) {
            this.setState({show:0,text:'上传'+Math.round(info.event.percent*100)/100+'%'});
        }
        if (info.file.status === 'done') {
            const {state} = info.file.response;
            if(state === 0){
                const {reload} = this.props;
                reload();
                this.setState({show:1,text:'上传成功',count:this.state.count+1});
            }else{
                this.setState({show:0,text:'上传失败'});
            }
        } else if (info.file.status === 'error') {
            this.setState({show:0,text:'上传失败'});
        }
    }

    render() {
        const {data,reload,dataId} = this.props;
        return (
                <div className="formBorder gray-border">
                    <div className="formArch hint">{this.state.text}</div>
                    <div className="formArch">
                        <div className="margin-form table-name">视频</div>
                        <div className="list-right"><Upload {...videoProps} data={{'archive.id':dataId,type:2}} onChange={this.onChangeHandler.bind(this)} beforeUpload={this.beforeUpload.bind(this)}>上传视频</Upload></div>
                    </div>
                    <EvidenceView data={data} type={2} reload={reload}/>
                    <div className="formArch">(以上格式为：RM,MVB,WMV,AVI,MP4,3GP,MKV,单个文件大小不得大于20M,全部大小不得大于100M。)</div>
                    <div className="formArch">
                        <div className="margin-form table-name">照片</div>
                        <dic className="list-right"><Upload {...videoProps} data={{'archive.id':dataId,type:0}} onChange={this.onChangeHandler.bind(this)} beforeUpload={this.beforeUpload.bind(this)} >上传照片</Upload></dic>
                    </div>
                    <EvidenceView data={data} type={0} reload={reload}/>
                    <div className="formArch">(以上格式为：JPEG(*.JPG *.JPEG *.JPE),PNG,单个文件大小不得大于2M,全部大小不得大于10M。)</div>
                    <div className="formArch">
                        <div className="margin-form table-name">录音</div>
                        <dic className="list-right"><Upload {...videoProps} data={{'archive.id':dataId,type:1}} onChange={this.onChangeHandler.bind(this)} beforeUpload={this.beforeUpload.bind(this)} >上传录音</Upload></dic>
                    </div>
                    <EvidenceView data={data} type={1} reload={reload}/>
                    <div className="formArch">(以上格式为：MP3,WMA,FLAC,MMF,AMR,M4A,M4R,MP2，WAV,单个文件大小不得大于2M,全部大小不得大于10M。)</div>
                </div>
        )
    }
}

EvidenceCell.propTypes = {
    data: PropTypes.array,
    reload: PropTypes.func,
    dataId: PropTypes.string.isRequired
};

export default EvidenceCell