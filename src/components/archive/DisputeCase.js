/**
 * Created by Administrator on 2017/7/10 0010.
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as syncActions from '../../actions/syncAction'

class DisputeCase extends Component {
    render() {
        const { archive } = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {content} = data||{};
        let n = '';
        let next = <div><div className="page-next"></div><div className="page-fixed-height"></div></div>;
        let cont = (content||'').split('\n').map((i,k)=><p key={k}>{i}</p>);
        let allnum = 0;
        let conts = (content||'').split('\n');
        let text = '';
        for(var i = 0;i<conts.length;i++){
            n = Math.ceil(conts[i].length/48);
            console.log(n);
            allnum = allnum + n;
        }
        let contents = (content||'').substr(0,1000);
        let ends = (content||'').substr(1000);
        text = <div>{contents}{next}{ends}</div>;
        console.log(text);
        if(n>20){
                next = <div>
                            <div className="page-next"></div>
                            <div className="page-fixed-height"></div>
                        </div>

        }
        return (
            <div className="formArch content-indent">{text}</div>
        )
    }
}

function	select(state)	{
    return	{
        archive:state.archive,
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(DisputeCase);
