import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {SELECT_DATA} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import { Checkbox } from 'antd';

class PopMediator extends Component {

    constructor(props, context) {
        super(props, context);
        const {onChangeHandler} = props;
        this.onChangeHandler = onChangeHandler;
        this.state = {value:[]};
    };

    componentWillMount() {
        this.setState({value:this.props.value});
    }

    componentDidMount(){
        this.loadSelect();
    }

    componentWillReceiveProps(next) {
        this.setState({value:next.value});
    }

    loadSelect(){
        const	{actions,selectItemData,url,domain}=this.props;
        if(url===null||url===undefined||url===''||domain===null||domain===undefined||domain===''){
            return;
        }
        const domainData =(selectItemData||{})[domain];
        if(domainData===null||domainData===undefined){
            actions.request(SELECT_DATA,{domain},url);
        }
    }

    value(){
        return this.state.value;
    }

    handleChange(e){
        if(e.target.checked){
            const value =  this.state.value;
            if(value.indexOf(e.target.value) === -1){
                value.push(e.target.value);
                this.setState({value});
            }
        }else{
            const value =  this.state.value;
            if(value.indexOf(e.target.value) !== -1){
                this.setState({value:value.filter((i)=>i !== e.target.value)});
            }
        }
        if(this.onChangeHandler){
            this.onChangeHandler(e, this.state.value);
        }
    }

    getOptions(){
        const {id,selectItemData,textKey,valueKey,domain,data,name} = this.props;
        const domainData =(selectItemData||{})[domain]||data;
        let options;
        if(domainData!==null && domainData !== undefined){
            options = domainData.map((value,index)=>{
                return <div key={id+'_select_cell_'+index} className="formArch"><Checkbox  onChange={this.handleChange.bind(this)} name={name+'['+index+'].id'} value={value[valueKey]}>{value[textKey]}</Checkbox></div>
            })
        }
        return options;
    }
    render() {
        return (
            <div >
                {this.getOptions()}
                <div className="pop-submit">
                    <input type="button" name="button" data-close="save" value="保存"  className="btn-pop"/>
                    <input type="button" name="button" value="取消"  className="btn-reset" data-close="pop_cross"/>
                </div>
                <div className="error-height"></div>
            </div>
        )
    }
}

PopMediator.propTypes = {
    value: PropTypes.array,
    url: PropTypes.string,
    domain: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.array,
    textKey: PropTypes.string,
    valueKey: PropTypes.string,
    showHead: PropTypes.bool,
    head: PropTypes.string,
    onChangeHandler: PropTypes.func
};

PopMediator.defaultProps = {
    showHead:true,
    value:[],
    textKey:'name',
    head:'全部',
    valueKey:'id'
};

function mapStateToProps(state) {
    return {
        selectItemData: state.selectItemData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps,null,{withRef:true})(PopMediator);