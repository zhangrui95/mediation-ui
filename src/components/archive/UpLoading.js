import React, { Component, PropTypes } from 'react'
import { Upload, Button, Icon } from 'antd';

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

const props = {
    action: 'api/archive/finish.json',
    listType: 'picture',
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

class UpLoading extends Component {
    render() {
        const { dataId} = this.props;
        return (
            <div>
                <Upload {...props} data={{id:dataId}}>
                    <Button>
                        <Icon type="upload" /> 上传
                    </Button>
                </Upload>
            </div>
        )
    }

}

UpLoading.propTypes = {
    dataId: PropTypes.string.isRequired
};

export default UpLoading