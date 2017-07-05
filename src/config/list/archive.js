
const option = {
    // init:false,
    title:'全部卷宗',
    titleBtn:'创建新案件',
    titleBtnHandler: () => {
        console.log('创建新案件',this)
        window.location.href = '/archive';
    },
    limit:15,
    displayTotalInHead:true,
    columns:[
        {label:'序号',cell:'IndexCell',width:40},
        {label:'卷宗名称',cell:'ViewEntCell',idKey:"id",dataKey:"name",width:230},
        {label:'卷宗类型',dataKey:"type.name"},
        {label:'卷宗状态',cell:'StateCell',dataKey:"state"},
        {label:'立卷时间',cell:'DateCell',type:'date',dataKey:"createTime"},
        {label:'操作',cell:'LinkCell',dataKey:"canPause",links:[{key:'asssxx'}]}
    ],
    url:'api/archive/list.json'
};

export default option;
