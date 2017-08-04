import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EvidenceCell from './EvidenceCell'
import {LIST_BY_ARCHIVE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {setHeaderClass,setFooterClass} from '../../utils/body'

class EvidenceList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {imgId:''};
        this.print = false;
    }
    
    componentDidMount() {
        setHeaderClass('print-header-box');
        setFooterClass('print-bottom-box');
    }

    componentWillMount(){
        this.load();
    }

    componentDidUpdate(){
        if(this.print){
            this.print = false;
            setTimeout(function(){
                window.print();
            },800);
        }
    }

    load(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(LIST_BY_ARCHIVE,{id});
    }

    static getArchiveData(archive){
        const {response} = archive;
        const {data} = response||{};
        return data
    }

    getPrint(e){
        this.setState({imgId:e.target.id});
        this.print = true;
    }
    
    render() {
        const { archive,evidence ,params} = this.props;
        const {id} = params;
        const {response} = evidence;
        const {data} = response||{};
        let imgId = this.state.imgId;
        let src = 'api/evidence/photo.json?id='+imgId;
        let imgBox = '';
        if(imgId !== ''){
            imgBox = <div><div className="title-form-name hidden print-show">证据照片</div><div className="hidden print-show"><div className="formArch word-title">证据照片</div><img className="evid-img" src={src}/></div></div>
        }
        if(data === null || data === undefined){
            return null;
        }
        return (
            <div>
                <div className="title-form-name print-hide">证据上传</div>
                {imgBox}
                <EvidenceCell getPrint={this.getPrint.bind(this)} dataId={id} archive={EvidenceList.getArchiveData(archive)} data={data} dataId={id} reload={this.load.bind(this)}/>
            </div>
        )
    }
}

EvidenceList.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive,
        evidence:state.evidence
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(EvidenceList);
