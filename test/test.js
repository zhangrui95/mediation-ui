import fetchMock from 'fetch-mock'
// import fs from 'fs'
import {DEV_REQ_HOST} from '../src/constants/ActionTypes'

fetchMock.mock(DEV_REQ_HOST+'api/user/menu.json',{navList:[
    {id:'1',name:'卷宗列表',route:'/list/archive'},
    {id:'2',name:'用户列表',route:'/list/user'}
]});

fetchMock.mock(DEV_REQ_HOST+'api/user/uppass.json',{upStatus:'0'});
fetchMock.mock(DEV_REQ_HOST+'api/user/validatePass.json',{result:'0'});

fetchMock.mock(DEV_REQ_HOST+'api/user/me.json',{user:{name:'小燕子1',id:'1'},state:0});
fetchMock.mock(DEV_REQ_HOST+'api/signOut',{state:0});
fetchMock.post(DEV_REQ_HOST+'api/signIn',function(url,option){
    const data = option.body||'';
    if(data!==null && data!== undefined &&
        (typeof data === 'string' ? data.indexOf('user=test')>=0 : data.user==='test') &&
        (typeof data === 'string' ? data.indexOf('pass=test')>=0 : data.pass==='test')){
        if(typeof data === 'string' ? data.indexOf('verify=1872')>=0 : data.verify==='1872'){
            return {user:{name:'小燕子1',id:'1'},state:0}
        }
        return {state:-1,msg:'验证码输入有误'}
    }
    return {state:-1,msg:'用户名或密码输入有误'}
});

fetchMock.mock(DEV_REQ_HOST+'api/archiveType/options.json',[{id:'1',name:'邻里纠纷'},{id:'2',name:'权属纠纷'},{id:'13',name:'其他纠纷'}]);

fetchMock.post(DEV_REQ_HOST+'api/user/list.json',function(){
    return {total:3,data:[
        {id:'1',name:'管理员'},
        {id:'2',name:'调解员1'},
        {id:'3',name:'调解员2'}
    ]}
});

fetchMock.mock('^'+DEV_REQ_HOST+'api/user/listByRole.json',function(){
    return [
        {id:'2',name:'调解员1'},
        {id:'3',name:'调解员2'}
    ]
});

fetchMock.post(DEV_REQ_HOST+'api/archive/list.json',function(){
    return {total:5,data:[
        {id:'1',name:'卷宗1',type:{id:'13',name:'其他纠纷'},state:0,createTime:1499240237246,canPause:0},
        {id:'2',name:'卷宗2',type:{id:'1',name:'邻里纠纷'},state:1,createTime:1499240237246,canPause:0},
        {id:'3',name:'卷宗3',type:{id:'2',name:'权属纠纷'},state:2,createTime:1499240237246,canPause:0},
        {id:'4',name:'卷宗4',type:{id:'2',name:'权属纠纷'},state:-1,createTime:1499240237246,canPause:0},
        {id:'5',name:'卷宗5',type:{id:'2',name:'权属纠纷'},state:0,createTime:1499240237246,canPause:-1},
    ]}
});

const archiveData = {id:'1',name:'卷宗1',type:{id:'13',name:'其他纠纷'},state:1,createTime:1499240237246,keepTime:1509240237246,applyTime:1409240238246,canPause:0,content:'xxxxxasdasd',protocolPath:'1',
    finishState:0,
    manager:{id:'2',name:'调解员1'},
    creater:{id:'2',name:'调解员1'},
    litigants:[
        {id:'1',name:'p1',card:'230132199602200369',sex:1,nation:'汉',age:12,address:'地址1',contact:'13012345678',createTime:1499240237246,archive:{}},
        {id:'2',name:'p2',card:'230132199602200360',sex:1,nation:'汉',age:12,address:'地址2',contact:'13012345679',createTime:1499240237246,archive:{}},
    ],
    workers:[
        {id:'3',worker:{id:'2',name:'调解员1'},createTime:1499240237246,archive:{}},
        {id:'4',worker:{id:'3',name:'调解员2'},createTime:1499240237246,archive:{}},
    ]
};

fetchMock.post(DEV_REQ_HOST+'api/archive/detail.json',function(){
    return {state:0,
        data:archiveData,
        protocol:{id:'1',remark:'xxx',result:-1,content:'xxx',createTime:1499240237246,creater:{},archive:{}},
        check:{id:'1',visitTime:1499240237246,content:'xxx',createTime:1499240237246,creater:{},archive:{}}
    }
});
fetchMock.mock(DEV_REQ_HOST+'api/archive/suspend.json',{state:0});

fetchMock.mock(DEV_REQ_HOST+'api/archive/save.json',{state:0, data:Object.assign({},archiveData,{applyTime:1409240238246})});

fetchMock.mock(DEV_REQ_HOST+'api/archive/update.json',{state:0,data:archiveData});

fetchMock.mock(DEV_REQ_HOST+'api/archive/uploadProtocol.json',{state:0,data:archiveData});

fetchMock.mock(DEV_REQ_HOST+'api/archive/finish.json',{state:0,data:archiveData});

fetchMock.mock(DEV_REQ_HOST+'api/litigant/save.json',{state:0, data:{id:'1'}});

fetchMock.mock(DEV_REQ_HOST+'api/litigant/update.json',{state:0});

fetchMock.mock('^'+DEV_REQ_HOST+'api/archiveWorker/workers.json',function(){
    return [
        {id:'2',name:'调解员1'},
        {id:'3',name:'调解员2'}
    ]
});

const investData = {id:'1',investTime:1499240237246,address:'xxx',otherPerson:'xxx',targetPerson:'xxx',content:'芜湖扩所多军付军付多或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或\n芜湖扩所多军付军付多或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或军付多芜湖扩所多军付军付多或或或或或或或或或或或或或或或或或或或或或或或或或或或或',createTime:1499240237246,
    workers:[
        {id:'3',worker:{id:'2',name:'调解员1'},createTime:1499240237246,investigation:{}},
        {id:'4',worker:{id:'3',name:'调解员2'},createTime:1499240237246,investigation:{}},
    ],
    creater:{},
    archive:{}
};

fetchMock.mock(DEV_REQ_HOST+'api/investigation/listByArchive.json',{data:[
    investData,
    investData
]});

fetchMock.mock(DEV_REQ_HOST+'api/investigation/detail.json',{state:0,data:investData});
fetchMock.mock(DEV_REQ_HOST+'api/investigation/save.json',{state:0,data:investData});
fetchMock.mock(DEV_REQ_HOST+'api/investigation/update.json',{state:0,data:investData});

fetchMock.mock(DEV_REQ_HOST+'api/mediate/listByArchive.json',{data:[
    {id:'1',mediateTime:1499240237246,address:'xx01',content:'x001',createTime:1499240237246,creater:{},archive:{},workers:[]},
    {id:'2',mediateTime:1499240238246,address:'xx02',content:'x002',createTime:1499240238246,creater:{},archive:{},workers:[]}
]});
fetchMock.mock(DEV_REQ_HOST+'api/mediate/detail.json',{state:0,data:{id:'1',mediateTime:1499240237246,address:'xxx1',content:'xxx1',createTime:1499240237246,creater:{},archive:{},workers:[]}});
fetchMock.mock(DEV_REQ_HOST+'api/mediate/save.json',{state:0,data:{id:'1',mediateTime:1499240237246,address:'xxx1',content:'xxx1',createTime:1499240237246,creater:{},archive:{},workers:[]}});
fetchMock.mock(DEV_REQ_HOST+'api/mediate/update.json',{state:0,data:{id:'1',mediateTime:1499240237246,address:'xxx1',content:'xxx1',createTime:1499240237246,creater:{},archive:{},workers:[]}});


fetchMock.mock(DEV_REQ_HOST+'api/protocol/detailByArchive.json',{state:-1,data:null});
fetchMock.mock(DEV_REQ_HOST+'api/protocol/save.json',{state:0,data:{id:'1',remark:'xxx',result:0,content:'xxx',createTime:1499240237246,creater:{},archive:{}}});
fetchMock.mock(DEV_REQ_HOST+'api/protocol/update.json',{state:0,data:{id:'1',remark:'xxx',result:0,content:'xxx',createTime:1499240237246,creater:{},archive:{}}});

fetchMock.mock(DEV_REQ_HOST+'api/checkVisit/detailByArchive.json',{state:0,data:{id:'1',visitTime:1499240237246,content:'xxxxxse',createTime:1499240237246,creater:{},archive:{}}});
fetchMock.mock(DEV_REQ_HOST+'api/checkVisit/save.json',{state:0,data:{id:'1',visitTime:1499240237246,content:'xxxxxse',createTime:1499240237246,creater:{},archive:{}}});
fetchMock.mock(DEV_REQ_HOST+'api/checkVisit/update.json',{state:0,data:{id:'1',visitTime:1499240237246,content:'xxxxxse',createTime:1499240237246,creater:{},archive:{}}});

fetchMock.mock(DEV_REQ_HOST+'api/evidence/listByArchive.json',{data:[
    {id:'1',name:'x1',type:0,size:12,createTime:1499240237246,creater:{id:'1',name:'rw'},archive:{}},
    {id:'2',name:'x2',type:1,size:32,createTime:1499240237246,creater:{id:'2',name:'asd'},archive:{}},
    {id:'3',name:'x3',type:2,size:22,createTime:1499240237246,creater:{id:'3',name:'三大'},archive:{}}
]});
fetchMock.mock(DEV_REQ_HOST+'api/evidence/save.json',{state:0, data:{id:'1'}});
fetchMock.mock(DEV_REQ_HOST+'api/evidence/delete.json',{state:0});
// fetchMock.mock(DEV_REQ_HOST+'api/evidence/download.json',function(req,res){
//     res.setHeader('Content-Type','application/octet-stream');
//     res.setHeader('Content-Disposition','attachment; filename="' + encodeURI('下载测试文件') + '"');
//     res.end(fs.readFileSync(__dirname+'/resources/test.txt'));
// });
// fetchMock.mock(DEV_REQ_HOST+'api/evidence/photo.json',function(req,res){
//     res.setHeader('Content-Type','image/png');
//     res.end(fs.readFileSync(__dirname+'/resources/img.jpg'));
// });
// fetchMock.mock(DEV_REQ_HOST+'api/archive/protocolPhoto.json',function(req,res){
//     res.setHeader('Content-Type','image/png');
//     res.end(fs.readFileSync(__dirname+'/resources/img.jpg'));
// });
// fetchMock.mock(DEV_REQ_HOST+'api/archive/protocolDownload.json',function(req,res){
//     res.setHeader('Content-Type','application/octet-stream');
//     res.setHeader('Content-Disposition','attachment; filename="' + encodeURI('下载测试文件') + '"');
//     res.end(fs.readFileSync(__dirname+'/resources/test.txt'));
// });