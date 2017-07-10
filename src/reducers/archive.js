import  {ARCHIVE_DETAIL_RESET,ARCHIVE_DETAIL,ARCHIVE_ADD,ARCHIVE_ACTION_RESET,ARCHIVE_UPDATE} from '../constants/ActionTypes'
import syncReducer from './syncReducer'

export default syncReducer({
    [ARCHIVE_DETAIL]:{ },
    [ARCHIVE_ADD]:{
        request: (state) => Object.assign({},state,{action:'add'})
    },
    [ARCHIVE_UPDATE]:{
        request: (state) => Object.assign({},state,{action:'update'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    }
},(state,action) => {
    switch (action.type) {
        case ARCHIVE_DETAIL_RESET:
            return {};
        case ARCHIVE_ACTION_RESET:
            return Object.assign({},state,{action:'',actionResponse:null});
        default:
            return state;
    }
})
