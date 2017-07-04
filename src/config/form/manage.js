/**
 * Created by FTY on 2016/9/5.
 */
const option = {
    items:[
        {type:'InputItem',label:'企业名称',name:'name',dataUrl:'api/enterprise/nameTop.json'},
        {type:'SelectItem',label:'行政区划',name:'area',dataUrl:'api/enterprise/areas.json'},
        {type:'SelectItem',label:'企业类型',name:'enterpriseType',dataUrl:'api/enterprise/entTypes.json'},
        {type:'SelectItem',label:'监管负责人',name:'master',dataUrl:'api/enterprise/assignedUsers.json',head:'全部'},
        {type:'SelectItem',label:'职业卫生信息',name:'zyws',data:[{id:'1',name:'已填报'},{id:'0',name:'未填报'}]},
        {type:'SelectItem',label:'直管安监机构',name:'orgScope',dataUrl:'api/enterprise/orgScope.json'},
        {type:'DateRange2Item',label:'注册日期',name:'createDate',name1:'createDateStart',name2:'createDateEnd'}
    ]
};
export default option;