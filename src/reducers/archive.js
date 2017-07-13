import  {ARCHIVE_DETAIL_RESET,ARCHIVE_DETAIL,ARCHIVE_ADD,ARCHIVE_ACTION_RESET,ARCHIVE_UPDATE,ARCHIVE_FINISH,
    ARCHIVE_SET_PROTOCOL,ARCHIVE_SET_CHECK} from '../constants/ActionTypes'
import syncReducer from './syncReducer'
import merge from 'lodash/merge'

export default syncReducer({
    [ARCHIVE_DETAIL]:{ },
    [ARCHIVE_ADD]:{
        request: (state) => Object.assign({},state,{action:'add'})
    },
    [ARCHIVE_UPDATE]:{
        request: (state) => Object.assign({},state,{action:'update'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    },
    [ARCHIVE_FINISH]:{
        request: (state) => Object.assign({},state,{action:'update'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    }
},(state,action) => {
    switch (action.type) {
        case ARCHIVE_DETAIL_RESET:
            return {};
        case ARCHIVE_ACTION_RESET:
            const ret = {action:'',actionResponse:null};
            if(action.data){
                ret.response = {data:action.data}
            }
            return merge({},state,ret);
        case ARCHIVE_SET_PROTOCOL:
            return merge({},state,{response:{protocol:action.data}});
        case ARCHIVE_SET_CHECK:
            return merge({},state,{response:{check:action.data}});
        default:
            return state;
    }
})
