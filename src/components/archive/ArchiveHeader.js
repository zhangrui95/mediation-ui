import React, { Component, PropTypes } from 'react'
import HeaderTop from "./HeaderTop";
const msg=[
    {
        'route':'',
        'name':'登记表',
        'index': 0,
    },
    {
        'route':'/evidence',
        'name':'证据上传',
        'index': 1,
    },
    {
        'route':'/applyFor',
        'name':'申请书',
        'index': 2,
    },
    {
        'route':'/investigation',
        'name':'调查记录',
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
        'name':'结案',
        'index': 7,
    },

];
class ArchiveHeader extends Component {
    constructor(props, context) {
        super(props, context);
        const { params } = props;
        const {id} = params;
        let add = 'add';
        if(id !==null && id !== undefined && id!== ''){
            add = '';
        }
        this.state = {index:this.findIndex(props),add:add};
    }
    componentWillReceiveProps(next) {
        const index = this.findIndex(next)
        if(this.state.index !== index){
            this.setState({index});
        }
    }
    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const div = e.target;
            const routeUrl = div.getAttribute('data-route')||'';
            if(routeUrl === null || routeUrl === undefined){
                return
            }
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
    findIndex(props){
        const { params,location } = props;
        const {id,mid} = params;
        const { basename,pathname } = location;
        if(id !==null && id !== undefined && id!== ''){
            const prefix = basename === '/' ? '':'/';
            const midPath = mid && mid !== '' ? ('/'+mid):'';
            const idx = msg.findIndex((i)=>{
                return pathname === (prefix+'archive/'+id+i.route+midPath)
            });
            return idx === -1 ? 0: idx;
        }
        return 0;
    }
    render() {
        const list = msg.map((data,i)=>{
            return <HeaderTop key={i} isActive={i===this.state.index} add={this.state.add} data={data}/>
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
