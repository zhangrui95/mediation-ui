import  {ARCHIVE_DETAIL_RESET,ARCHIVE_DETAIL} from '../constants/ActionTypes'
import syncReducer from './syncReducer'

export default syncReducer({
    [ARCHIVE_DETAIL]:{ }
},(state,action) => {
    switch (action.type) {
        case ARCHIVE_DETAIL_RESET:
            return {};
        default:
            return state;
    }
})
