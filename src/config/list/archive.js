
const option = {
    // init:false,
    title:'全部卷宗',
    btnName:'创建新案件',
    limit:15,
    columns:[
        {label:'序号',cell:'IndexCell',width:40},
        {label:'卷宗名称',cell:'ViewEntCell',links:[{url:'#',key:'detail'}],idKey:"id",dataKey:"name",width:230},
        {label:'卷宗类型',dataKey:"type.name"},
        {label:'卷宗状态',dataKey:"state"},
        {label:'立卷时间',cell:'DateCell',type:'date',dataKey:"createTime"},
        {label:'操作',cell:'LinkCell',links:[{name:'中止',url:'api/archive/list.json',key:'asssxx'}]}
    ],
    url:'api/archive/list.json'
};

export default option;
