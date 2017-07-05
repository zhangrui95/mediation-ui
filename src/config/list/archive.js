
const option = {
    // init:false,
    title:'全部卷宗',
    limit:15,
    columns:[
        {label:'序号',cell:'IndexCell',width:40},
        {label:'卷宗名称',cell:'ViewEntCell',idKey:"id",url:"api/enterprise/detail?uuid=",dataKey:"name",width:230},
        {label:'卷宗类型',dataKey:"enterpriseType.name"},
        {label:'卷宗状态',dataKey:"area.name"},
        {label:'立卷时间',cell:'DateCell',type:'date',dataKey:"createDate"},
        {label:'操作',cell:'LinkCell',links:[{name:'中止',url:'#',key:'asssxx'}],dataKey:"supervise.superviseResponsible.name"}
    ],
    url:'api/archive/list.json'
};

export default option;
