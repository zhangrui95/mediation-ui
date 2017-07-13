import React, { Component, PropTypes } from 'react'
import HeaderTop from "./HeaderTop";
var msg=[
    {
        'route':'',
        'name':'登记表',
        'index': 0,
    },
    {
        'route':'/evidence',
        'name':'调查取证',
        'index': 1,
    },
    {
        'route':'/applyFor',
        'name':'申请书',
        'index': 2,
    },
    {
        'route':'/investigation',
        'name':'调查表',
        'index': 3,
    },
    {
        'route':'/mediate',
        'name':'调解记录',
        'index': 4,
    },
    {
        'route':'/protocol',
        'name':'协议书',
        'index': 5,
    },
    {
        'route':'/checkVisit',
        'name':'回访记录',
        'index': 6,
    },
    {
        'route':'/finish',
        'name':'完结',
        'index': 7,
    },

];
class ArchiveHeader extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {index:0};
    }
    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const div = e.target;
            const routeUrl = div.getAttribute('data-route')||'';
            const index = div.getAttribute('data-index')*1;
            this.setState({index});
            const	{router}	=	this.context;
            router.push('/archive/'+id+routeUrl);
        }
    }
    goBack(){
        const	{router}	=	this.context;
        router.push('/list/archive');
    }
    render() {
        const list = msg.map((data,i)=>{
            return <HeaderTop key={i} isActive={i===this.state.index} data={data}/>
        });
        return (
            <div>
                <a className="go-first" onClick={this.goBack.bind(this)}>&lt;&lt;返回首页</a>
                <div className="archeader-box" onClick={this.clickHandler.bind(this)} >
                    {list}
                </div>
            </div>
        )
    }
}

ArchiveHeader.propTypes = {
    children: PropTypes.node
};

ArchiveHeader.contextTypes = {
    router: PropTypes.object
};

export default ArchiveHeader
