import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {ARCHIVE_FINISH} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import { Upload, Button, Icon } from 'antd';

const fileList = [];

const props = {
    action: 'api/archive/uploadProtocol.json',
    listType: 'picture',
    defaultFileList: [...fileList],
    className: 'upload-list-inline',
    withCredentials: true,
    showUploadList: false
};

class UpLoading extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {state:0,show:0,text:''};
    }

    beforeUpload(file) {
        const isJPG = true;
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //     console.log('You can only upload JPG file!');
        // }
        console.log('upload type',file.type);
        console.log('upload size',file.size);
        const isLt2M = file.size / 1024 / 1024 < 2;
        let text = '开始上传...';
        if (!isLt2M) {
            text = '文件大于2M';
        }
        this.setState({show:0,text});
        return isJPG && isLt2M;
    }

    onChangeHandler(info){
        console.log('onChangeHandler',info);
        if (info.file.status !== 'uploading') {
            console.log('info',info);
        }
        if (info.event) {
            this.setState({show:0,text:'上传'+info.event.percent+'%'});
        }
        if (info.file.status === 'done') {
            console.log(`${info.file.name} file uploaded successfully`);
            const {actions} = this.props;
            const {state,data} = info.file.response;
            if(state === 0){
                actions.resetAction(data);
                this.setState({show:1,text:'上传成功'});
            }else{
                this.setState({show:0,text:'上传失败'});
            }
        } else if (info.file.status === 'error') {
            this.setState({show:0,text:'上传失败'});
        }
    }

    render() {
        const { dataId} = this.props;
        let img;
        if(this.state.show === 1){
            img = <img src={"api/archive/protocolPhoto.json?id="+dataId}/>
        }
        return (
            <div>
                <Upload {...props} data={{id:dataId}} onChange={this.onChangeHandler.bind(this)} beforeUpload={this.beforeUpload.bind(this)}>
                    <Button>
                        <Icon type="upload" /> 上传
                    </Button>
                </Upload><span>{this.state.text}</span>
                {img}
            </div>
        )
    }

}

UpLoading.propTypes = {
    dataId: PropTypes.string.isRequired
};

function	select(state)	{
    return	{
        archive:state.archive,
        header:state.header
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(arhciveActions, dispatch),
    }
}
export  default connect(select,actions)(UpLoading);