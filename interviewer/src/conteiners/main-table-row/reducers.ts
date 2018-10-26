import * as CONSTANTS from './constants';

export function row(state = {}, action: any){
    if(action.type === CONSTANTS.ACTION_ACTIVATE_ROW){
        return {...action.rowData}
    }
    return state
}