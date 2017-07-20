import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  SurveyList from './SurveyList'
import {INVESTIGATION_LIST} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {IMG_NO_DATA} from '../../constants/Constant';

class InvestigationList extends Component {
    componentWillMount(){
        this.load();
    }

    load(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(INVESTIGATION_LIST,{id});
    }

    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const	{router}	=	this.context;
            router.push('/archive/'+id+'/investigation/create');
        }
    }
    render() {
        const { investigation,params } = this.props;
        const {id} = params;
        const {response} = investigation;
        const {data} = response||{};
        let list = <div className="formBorder gray-border">
                        <div className="form-title-margin"><div className="list-top"><div className="list-left">调查记录列表</div><div className="list-right" onClick={this.clickHandler.bind(this)}>新建调查记录</div></div></div>
                        <SurveyList dataId={id}  data={data}/>
                    </div>
        if(data === null||data === undefined||data.length === 0){
            list = <div className="formBorder gray-border">
                        <img className="list-left empty-img" src={IMG_NO_DATA}/>
                        <div className="empty-btn" onClick={this.clickHandler.bind(this)}>新建调查记录</div>
                    </div>
        }
        return (
            <div>
                <div className="title-form-name">人民调解调查记录</div>
                {list}
            </div>
        )
    }
}

InvestigationList.propTypes = {
    children: PropTypes.node
};

InvestigationList.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        investigation:state.investigation
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(InvestigationList);

