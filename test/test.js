import fetchMock from 'fetch-mock'
import {DEV_REQ_HOST} from '../src/constants/ActionTypes'

fetchMock.mock(DEV_REQ_HOST+'api/user/menu.json',{navList:[
    {id:'1',name:'分配企业负责人',count:'88',isView:'0',isViewCount:'2',color:'red',route:'/list/manage/banner'},
    {id:'2',name:'我监管的企业',count:'88',isView:'0',isViewCount:'1',color:'blue',route:'/list/mine'},
    {id:'3',name:'职业卫生',route:'/list/health'},
    {id:'4',name:'分类分级',route:'/list/trade/banner'}
]});

fetchMock.mock(DEV_REQ_HOST+'api/enterprise/orgScope.json',[{id:'1',name:'南岗安全生产监督机构'},{id:'2',name:'其他安全生产监督机构'}]);
fetchMock.mock(DEV_REQ_HOST+'api/enterprise/areas.json',[{id:'1',name:'道里区'},{id:'2',name:'南岗区'}]);
fetchMock.mock(DEV_REQ_HOST+'api/enterprise/entTypes.json',[{id:'1',name:'危化'},{id:'2',name:'其他'}]);
fetchMock.mock(DEV_REQ_HOST+'api/user/uppass.json',{upStatus:'0'});
fetchMock.mock(DEV_REQ_HOST+'api/user/validatePass.json',{result:'0'});
fetchMock.mock(DEV_REQ_HOST+'api/enterprise/assgiedEnterpriseToUser.json',{result:'1'});
fetchMock.mock('^'+DEV_REQ_HOST+'api/enterprise/nameTop.json',['xqwe','x123','xasd']);

fetchMock.mock(DEV_REQ_HOST+'api/enterprise/assignedUsers.json',[{id:'1',name:'小燕子1'},{id:'2',name:'李四'}]);

fetchMock.mock(DEV_REQ_HOST+'api/user/banner.json?type=bind',{bannerList:[
    {isView:'0',count:'33',color:'blue',route:'/list/manage/banner',iconUrl:'assets/images/icon-1.png',id:'1',name:'全部企业'},
    {isView:'0',count:'11',color:'red',route:'/list/managed/banner',iconUrl:'assets/images/icon-2.png',id:'1',name:'已分配企业'},
    {isView:'0',count:'22',color:'blue',route:'/list/unmanage/banner',iconUrl:'assets/images/icon-3.png',id:'1',name:'未分配企业'}]});


fetchMock.mock(DEV_REQ_HOST+'api/user/banner.json?type=bindLv',{bannerList:[
    {count:'1000',id:'1',name:'全部企业'},
    {count:'892',id:'2',name:'已分配企业'},
    {count:'108',id:'3',name:'未分配企业'},
    {count:'946',id:'4',name:'已分类分级'},
    {count:'54',id:'5',name:'未分类分级'}]});

fetchMock.mock(DEV_REQ_HOST+'api/user/me.json',{user:{name:'小燕子1',id:'1'},state:0});
fetchMock.mock(DEV_REQ_HOST+'api/signOut',{state:0});
fetchMock.post(DEV_REQ_HOST+'api/signIn',function(url,option){
    const data = option.body||'';
    if(data!=null
        &&(typeof data === 'string' ? data.indexOf('user=test')>=0 : data.user=='test')
        &&(typeof data === 'string' ? data.indexOf('pass=test')>=0 : data.pass=='test')){
        if(typeof data === 'string' ? data.indexOf('verify=1872')>=0 : data.verify=='1872'){
            return {user:{name:'小燕子1',id:'1'},state:0}
        }
        return {state:-1,msg:'验证码输入有误'}
    }
    return {state:-1,msg:'用户名或密码输入有误'}
});

fetchMock.post(DEV_REQ_HOST+'api/enterprise/viewList.json',function(url,option){
    const data = option.body||'';
    if(data!=null&&(typeof data === 'string' ? data.indexOf('offset=3')>=0 : data.max==3)){
        return {
            data:[
                {id:'4',name:'ents4',addr:'4',lv:'一级',isL:'是4',isM:'是3'},
                {id:'5',name:'ents5',addr:'5',lv:'一级',isL:'是4',isM:'是3'},
                {id:'6',name:'ents6',addr:'6',lv:'二级',isL:'是4',isM:'是3'}
            ],
            total:9
        }
    }else if(data!=null&&(typeof data === 'string' ? data.indexOf('offset=6')>=0 : data.max==6)){
        return {
            data:[
                {id:'7',name:'ents7',addr:'7',lv:'一级',isL:'是5',isM:'是6'},
                {id:'8',name:'ents8',addr:'8',lv:'一级',isL:'是5',isM:'是6'},
                {id:'9',name:'ents9',addr:'9',lv:'二级',isL:'是5',isM:'是6'}
            ],
            total:9
        }
    }else{
        return {
            data:[
                {id:'1',name:'ents1',addr:'1',lv:'一级',isL:'是1',isM:'是2'},
                {id:'2',name:'ents2',addr:'2',lv:'一级',isL:'是1',isM:'是2'},
                {id:'3',name:'ents3',addr:'3',lv:'二级',isL:'是1',isM:'是2'}
            ],
            total:9
        };
    }
});

fetchMock.post(DEV_REQ_HOST+'api/enterprise/manageList.json?isBind=true',function(url,option){
    return {
        data:[
            {id:'1',name:'entsBind1',supervise:{superviseResponsible:{id:'1',name:'小燕子1'}},lv:'一级',isL:'是1',isM:'是2'},
            {id:'2',name:'entsBind2',supervise:{superviseResponsible:{id:'2',name:'李四'}},lv:'一级',isL:'是1',isM:'是2'},
            {id:'3',name:'entsBind3',supervise:{superviseResponsible:{id:'2',name:'李四'}},lv:'二级',isL:'是1',isM:'是2'}
        ],
        total:3
    };
});

fetchMock.post(DEV_REQ_HOST+'api/enterprise/manageList.json?isBind=false',function(url,option){
    return {
        data:[
            {id:'1',name:'entsUnBind1',addr:'1',lv:'一级',isL:'是1',isM:'是2'},
            {id:'2',name:'entsUnBind2',addr:'2',lv:'一级',isL:'是1',isM:'是2'},
            {id:'3',name:'entsUnBind3',addr:'3',lv:'二级',isL:'是1',isM:'是2'}
        ],
        total:3
    };
});

fetchMock.post(DEV_REQ_HOST+'api/enterprise/userBindedEnts.json',function(url,option){
    return {
        data:[
            {id:'1',name:'entsMine1',addr:'1',lv:'一级',isL:'是1',isM:'是2'},
            {id:'2',name:'entsMine2',addr:'2',lv:'一级',isL:'是1',isM:'是2'},
            {id:'3',name:'entsMine3',addr:'3',lv:'二级',isL:'是1',isM:'是2'}
        ],
        total:3
    };
});

fetchMock.post(DEV_REQ_HOST+'/page/trade',function(url,option){
    const data = option.body||'';
    if(data!=null&&(typeof data === 'string' ? data.indexOf('offset=3')>=0 : data.max==3)){
        return {
            data:[
                {id:'4',name:'trade4',addr:'4',lv:'一级',isL:'是4'},
                {id:'5',name:'trade5',addr:'5',lv:'一级',isL:'是4'}
            ],
            total:5
        }
    }else{
        return {
            data:[
                {id:'1',name:'trade1',addr:'1',lv:'一级',isL:'是1'},
                {id:'2',name:'trade2',addr:'2',lv:'一级',isL:'是1'},
                {id:'3',name:'trade3',addr:'3',lv:'二级',isL:'是1'}
            ],
            total:5
        };
    }
});