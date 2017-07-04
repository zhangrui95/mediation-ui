
const option = {
    // init:false,
    title:'分类分级企业',
    limit:3,
    columns:[
        {label:'序号',cell:'IndexCell',width:40},
        {label:'企业名称',cell:'ViewEntCell',idKey:"id",url:"api/enterprise/detail?uuid=",dataKey:"name",width:230},
        {label:'企业类型',dataKey:"isL"},
        {label:'行政区划',dataKey:"addr"},
        {label:'操作',cell:'LinkCell',links:[{name:'查看企业监管负责人',url:'#',key:'asssxx'}],width:120}
    ],
    url:'/page/trade'
};

export default option;
