import * as CONSTANTS from './constants';

export function removeInterview(id: string) {
    return {
        type: CONSTANTS.ACTION_REMOVE_INTERVIEW,
        id
    };
}