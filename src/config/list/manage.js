
const option = {
    // init:false,
    title:'全部企业',
    limit:15,
    columns:[
        {label:'序号',cell:'IndexCell',width:40},
        {label:'企业名称',cell:'ViewEntCell',idKey:"id",url:"api/enterprise/detail?uuid=",dataKey:"name",width:230},
        {label:'企业类型',dataKey:"enterpriseType.name"},
        {label:'行政区划',dataKey:"area.name"},
        {label:'监管负责人',dataKey:"supervise.superviseResponsible.name"},
        {label:'注册时间',cell:'DateCell',type:'date',dataKey:"createDate"}
    ],
    url:'api/enterprise/viewList.json'
};

export default option;
