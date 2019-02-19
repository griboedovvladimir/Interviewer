import * as CONSTANTS from './constants';

export function removeInterview(id: string) {
    return {
        type: CONSTANTS.ACTION_REMOVE_INTERVIEW,
        id
    };
}

export function activateRow(rowData: any) {
    return {
        type: CONSTANTS.ACTION_ACTIVATE_ROW,
        rowData
    };
}