import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import banners from './bannersReducer'
import lists from './lists'
import navs from './navReducer'
import selectItemData from './selectItemReducer'
import header from './headerReducer'
import enterprise from './enterprise'
import archive from './archive'
import archiveSuspend from './archiveSuspend'
import evidence from './evidence'
import investigation from './investigation'
import mediate from './mediate'
import protocol from './protocol'
import protocolSave from './protocolSave'
import checkvisitSave from './checkvisitSave'
import checkvisit from './checkvisit'
import investigationDetail from './investigationDetail'
import mediateDetail from './mediateDetail'
import evidenceDelete from './evidenceDelete'
import protocolUpdate from './protocolUpdate'
import checkvisitUpdate from './checkvisitUpdate'
import investigationUpdate from './investigationUpdate'
import investigationSave from './investigationSave'



const reducers = {banners,selectItemData,lists,navs,header,enterprise,archive,archiveSuspend,evidence,investigation,mediate,protocol,protocolSave,checkvisitSave,checkvisit,investigationDetail,mediateDetail,
    protocolUpdate,checkvisitUpdate,investigationUpdate,investigationSave,
    evidenceDelete};

const rootReducer = combineReducers(Object.assign({},reducers,{routing}));

export const keys = Object.keys(reducers);

export default rootReducer
