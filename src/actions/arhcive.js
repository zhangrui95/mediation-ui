import  {ARCHIVE_DETAIL_RESET,ARCHIVE_ACTION_RESET} from '../constants/ActionTypes'

export function reset() {
    return {type:ARCHIVE_DETAIL_RESET}
}

export function resetAction() {
    return {type:ARCHIVE_ACTION_RESET}
}