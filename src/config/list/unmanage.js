const option = {
    title:'未分配企业',
    limit:15,
    columns:[
        {label:'序号',cell:'IndexCell',width:40},
        {label:'企业名称',cell:'ViewEntCell',idKey:"id",url:"api/enterprise/detail?uuid=",dataKey:"name",width:230},
        {label:'企业类型',dataKey:"enterpriseType.name"},
        {label:'行政区划',dataKey:"area.name"},
        {label:'注册时间',cell:'DateCell',type:'date',dataKey:"createDate"},
        {label:'操作',cell:'NewCheckedCell',name:"分配企业监管负责人",url:"api/enterprise/assignedUsers.json",domain:"master",width:120}
    ],
    url:'api/enterprise/manageList.json?isBind=false'
};

export default option;
