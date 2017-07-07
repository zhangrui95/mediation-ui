/**
 * Created by Administrator on 2017/7/7 0007.
 */
import React, { Component, PropTypes } from 'react'
import { Upload, Button, Icon } from 'antd';

const fileList = [];

const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    defaultFileList: [...fileList],
    className: 'upload-list-inline',
};

class UpLoading extends Component {
    render() {
        return (
            <div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> 上传
                    </Button>
                </Upload>
            </div>
        )
    }

}
export default UpLoading