import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as syncActions from '../../actions/syncAction';
import { Input } from 'antd';
import Pop from '../pop/Pop';
import PopMediator from './PopMediator'
import AddPartyinput from './AddPartyinput'

class ArchiveDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {addBox:false,passConfirm:false,goOutConfirm:false};
    };
    upAddClick(){
        this.setState({addBox:true});
    }
    saveButtonClick(){
        const addBox = this.refs.addBox;
        if(!addBox.check()){
            return false;
        }
        return false;
    }
    render() {
        const { archive } = this.props;
        const {response} = archive;
        const {state,data,protocol} = response||{};
        let name
        if(state === 0){
            name = data.name
        }else{
            name = <Input className="text-input" style={{ width: 350 }} placeholder="" />
        }
        return (
            <div>
                    <div className="title-form-name">人民调解登记表</div>
                    <div className="formBorder">
                    <div className="border-box">
                        <div className="formArch">
                            <div className="margin-form">卷宗名称：{name}</div>
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
                        <AddPartyinput/>
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
                            <div className="margin-form">第二调解员：<input onClick={this.upAddClick.bind(this)} type="button" value="选择"/></div>
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
                <Pop title="添加调解员" visible={this.state.addBox} closeHandlers={{save:this.saveButtonClick.bind(this)}} closeDoneHandler={()=>this.setState({addBox:false})}>
                   <PopMediator/>
                </Pop>
                </div>
        )
    }
}

ArchiveDetail.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(ArchiveDetail);
