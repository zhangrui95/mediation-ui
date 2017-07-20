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
        this.state = {state:0,show:0,text:'',text1:'',text2:'',count:0};
    }

    beforeUploadView(file) {
        const isLt2M = file.size / 1024 / 1024 < 100;
        let text = '(开始上传...)';
        if (!isLt2M) {
            text = '(文件不能大于100M)';
        }
        this.setState({text});
        return isLt2M;
    }
    
    beforeUploadImg(file) {
        // const isJPG = true;
        // const isJPG = file.type === 'image/jpeg'||'image/png';
        // if (!isJPG) {
        //     text1 = '(只能上传JPG,PNG,JPEG格式的图片)';
        // }
        const isLt2M = file.size / 1024 / 1024 < 10;
        let text1 = '(开始上传...)';
        if (!isLt2M) {
            text1 = '(文件不能大于10M)';
        }
        this.setState({text1});
        return isLt2M;
    }
    
    beforeUploadRecord(file) {
        const isLt2M = file.size / 1024 / 1024 < 20;
        let text2 = '(开始上传...)';
        if (!isLt2M) {
            text2 = '(文件不能大于20M）';
        }
        this.setState({text2});
        return isLt2M;
    }

    onChangeView(info){
        let text = '(上传成功)';
        if (info.event) {
            this.setState({text:'(上传'+Math.round(info.event.percent*100)/100+'%)'});
        }
        if (info.file.status === 'done') {
            const {state} = info.file.response;
            if(state === 0){
                text = '(上传成功)';
                const {reload} = this.props;
                reload();
                this.setState({text,count:this.state.count+1});
            }else{
                text = '(上传失败)';
                this.setState({text});
            }
        } else if (info.file.status === 'error') {
            text = '(上传失败)';
            this.setState({text});
        }
    }

    onChangeImg(info){
        if (info.event) {
            this.setState({text1:'(上传'+Math.round(info.event.percent*100)/100+'%)'});
        }
        if (info.file.status === 'done') {
            const {state} = info.file.response;
            if(state === 0){
                const {reload} = this.props;
                reload();
                this.setState({text1:'(上传成功)',count:this.state.count+1});
            }else{
                this.setState({text1:'(上传失败)'});
            }
        } else if (info.file.status === 'error') {
            this.setState({text1:'(上传失败)'});
        }
    }

    onChangeRecord(info){
        if (info.event) {
            this.setState({text2:'(上传'+Math.round(info.event.percent*100)/100+'%)'});
        }
        if (info.file.status === 'done') {
            const {state} = info.file.response;
            if(state === 0){
                const {reload} = this.props;
                reload();
                this.setState({text2:'(上传成功)',count:this.state.count+1});
            }else{
                this.setState({text2:'(上传失败)'});
            }
        } else if (info.file.status === 'error') {
            this.setState({text2:'(上传失败)'});
        }
    }
    render() {
        const {data,reload,dataId} = this.props;
        return (
                <div className="formBorder gray-border">
                    <div className="form-title-margin">
                        <div className="list-top"><div className="list-left">视频</div><div className="list-left hint">{this.state.text}</div><div className="list-right"><Upload {...videoProps} accept="video/*" data={{'archive.id':dataId,type:2}} onChange={this.onChangeView.bind(this)} beforeUpload={this.beforeUploadView.bind(this)}>上传视频</Upload></div></div>
                    </div>
                    <EvidenceView data={data} type={2} reload={reload}/>
                    <div className="red-news-bottom">(以上格式为：AVI、MKV、MP4、WMV、FLV、MOV、3GP，单个文件大小不得大于100M，全部大小不得大于300M。)</div>
                    <div className="form-title-margin">
                        <div className="list-top"><div className="list-left">照片</div><div className="list-left hint">{this.state.text1}</div><div className="list-right"><Upload {...videoProps} accept="image/*" data={{'archive.id':dataId,type:0}} onChange={this.onChangeImg.bind(this)}  beforeUpload={this.beforeUploadImg.bind(this)} >上传照片</Upload></div></div>
                    </div>
                    <EvidenceView data={data} type={0} reload={reload}/>
                    <div className="red-news-bottom">(以上格式为：JPG、PNG、JPEG，单个文件大小不得大于10M，全部大小不得大于100M。)</div>
                    <div className="form-title-margin">
                        <div className="list-top"><div className="list-left">录音</div><div className="list-left hint">{this.state.text2}</div><div className="list-right"><Upload {...videoProps} accept="audio/*" data={{'archive.id':dataId,type:1}} onChange={this.onChangeRecord.bind(this)}  beforeUpload={this.beforeUploadRecord.bind(this)} >上传录音</Upload></div></div>
                    </div>
                    <EvidenceView data={data} type={1} reload={reload}/>
                    <div className="red-news-bottom">(以上格式为：MP3、WMA、ACC、WAV、M4A，单个文件大小不得大于20M，全部大小不得大于100M。)</div>
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