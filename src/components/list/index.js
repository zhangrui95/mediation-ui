import React from 'react'
import Cell from './Cell'
import DataCell from './DataCell'
import StateCell from './StateCell'
import DateCell from './DateCell'
import IndexCell from './IndexCell'
import NewCheckedCell from './NewCheckedCell'
import LinkCell from './LinkCell'
import ViewEntCell from './ViewEntCell'

const types = {
    Cell,
    DataCell,
    DateCell,
    IndexCell,
    StateCell,
    NewCheckedCell,
    LinkCell,
    ViewEntCell
};

function element(type,props,children, defEle) {
    if(type==null){
        return defEle;
    }
    const typeClass = types[type];
    return types ? React.createElement(typeClass,props,children) : defEle;
}

export default element;