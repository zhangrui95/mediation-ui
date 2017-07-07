import React, { Component, PropTypes } from 'react'
import { Input } from 'antd';
import Pop from '../pop/Pop';
import PopMediator from './PopMediator'

class ArchiveDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {passBox:false,passConfirm:false,goOutConfirm:false};
    };
    upPassWordClick(){
        this.setState({passBox:true});
    }
    saveButtonClick(){
        const passBox = this.refs.passBox;
        if(!passBox.check()){
            return false;
        }
        this.popChangePassword();
        return false;
    }
    render() {
        const { params } = this.props;
        console.log('ArchiveDetail id = ',params.id);
        return (
            <div>
                    <div className="title-form-name">人民调解登记表</div>
                    <div className="formBorder">
                    <div className="border-box">
                        <div className="formArch">
                            <div className="margin-form">卷宗名称：<Input className="text-input" style={{ width: 350 }} placeholder="" /></div>
                            <div className="margin-form">卷宗类别：
                                <select defaultValue="请选择" style={{ width: 200 }}>
                                    <option value="男">邻里纠纷</option>
                                    <option value="女">交通纠纷</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="border-box">
                        <div className="formArch">当事人</div>
                        <div className="formArch">
                            <div className="margin-form">姓名：<Input className="text-input" placeholder="" /></div>
                            <div className="margin-form">性别：
                                <select defaultValue="男" style={{ width: 70 }}>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                </select>
                            </div>
                            <div className="margin-form">民族：
                                <Input className="text-input" placeholder="" style={{ width: 70 }}/>
                            </div>
                            <div className="margin-form">年龄：<Input className="text-input" placeholder="" style={{ width: 70 }} /></div>
                            <div className="margin-form">身份证号码：<Input className="text-input" placeholder="" /></div>
                            <div className="margin-form">单位/住址：<Input className="text-input" style={{ width: 400 }} placeholder="" /></div>
                            <div className="margin-form">联系方式：<Input className="text-input" placeholder="" /></div>
                        </div>
                        <div className="formArch">
                            <div className="margin-form">姓名：<Input className="text-input" placeholder="" /></div>
                            <div className="margin-form">性别：
                                <select defaultValue="男" style={{ width: 70 }}>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                </select>
                            </div>
                            <div className="margin-form">民族：
                                <Input className="text-input" placeholder="" style={{ width: 70 }}/>
                            </div>
                            <div className="margin-form">年龄：<Input className="text-input" placeholder="" style={{ width: 70 }} /></div>
                            <div className="margin-form">身份证号码：<Input className="text-input" placeholder="" /></div>
                            <div className="margin-form">单位/住址：<Input className="text-input" style={{ width: 400 }} placeholder="" /></div>
                            <div className="margin-form">联系方式：<Input className="text-input" placeholder="" /></div>
                        </div>
                        <div className="formArch" style={{ height:40 }}><input type="button" value="添加当事人" className="addPerson"/></div>
                    </div>
                    <div className="border-box">
                        <div className="formArch">纠纷简要情况</div>
                        <div className="formArch"><Input type="textarea" rows={4} /></div>
                    </div>
                    <div className="border-box">
                        <div className="formArch">调解员</div>
                        <div className="formArch">
                            <div className="margin-form">第一调解员：
                                <select defaultValue="请选择" style={{ width: 200 }}>
                                    <option value="1">马冬梅</option>
                                    <option value="2">张三</option>
                                </select>
                            </div>
                        </div>
                        <div className="formArch">
                            <div className="margin-form">第二调解员：<input onClick={this.upPassWordClick.bind(this)} type="button" value="选择"/></div>
                        </div>
                    </div>
                    <div className="formArch">立卷人：<span>马冬梅</span></div>
                    <div className="formArch">立卷时间：<span>2017年07月03日</span></div>
                    <div className="formArch">调解日期：<span></span></div>
                    <div className="formArch">保管期限：<span></span></div>
                    <div className="formArch">达成协议时间：<span></span></div>
                    <div className="formArch">调解协议：<span></span></div>
                    <div className="formArch">协议履行情况：<span></span></div>
                    <div className="formArch">调解失败时间：<span></span></div>
                    <div className="formArch">当事人姓名：<span></span></div>
                    <div className="formArch">登记人：<span></span></div>
                    <div className="formArch">登记日期：<span></span></div>
                    <div className="formArch" style={{ height:40 }}><input type="button" value="保存" className="addPerson"/></div>
                </div>
                <Pop title="添加调解员" visible={this.state.passBox} closeHandlers={{save:this.saveButtonClick.bind(this)}} closeDoneHandler={()=>this.setState({passBox:false})}>
                   <PopMediator/>
                </Pop>
                </div>
        )
    }
}

ArchiveDetail.propTypes = {
    children: PropTypes.node
};

export default ArchiveDetail
