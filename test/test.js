import fetchMock from 'fetch-mock'
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

fetchMock.post(DEV_REQ_HOST+'api/user/listByRole.json',function(){
    return {total:3,data:[
        {id:'2',name:'调解员1'},
        {id:'3',name:'调解员2'}
    ]}
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
fetchMock.mock(DEV_REQ_HOST+'api/archive/suspend.json',{state:0});

fetchMock.post(DEV_REQ_HOST+'api/archiveWorker/workers.json',function(){
    return {total:3,data:[
        {id:'2',name:'调解员1'},
        {id:'3',name:'调解员2'}
    ]}
});