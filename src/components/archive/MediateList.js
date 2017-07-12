import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  MediateCell from './MediateCell'
import {MEDIATE_LIST} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'

class MediateList extends Component {
    componentWillMount(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(MEDIATE_LIST,{id});
    }
    clickHandler(e){
        const { params } = this.props;
        const {id} = params;

        if(id !==null && id !== undefined && id!== ''){
            const	{router}	=	this.context;
            router.push('/archive/'+id+'/mediate/create');
        }
    }
    render() {
        const { mediate,params  } = this.props;
        const {response} = mediate;
        const {data} = response||{};
        if(data == null){
            return null;
        }
        return (
            <div>
                <div className="title-form-name">人民调解记录</div>
                <div className="formArch">
                    <dic className="list-right" onClick={this.clickHandler.bind(this)}>新建</dic>
                </div>
                <MediateCell params={params} data={data}/>
            </div>
        )
    }
}

MediateList.propTypes = {
    children: PropTypes.node
};

MediateList.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        mediate:state.mediate
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(MediateList);