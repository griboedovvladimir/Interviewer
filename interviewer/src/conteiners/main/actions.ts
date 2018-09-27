import * as CONSTANTS from './constants';

export function addInterview(name: string, level: string, specialization: string, id: string) {
    return {
        type: CONSTANTS.ACTION_ADD_INTERVIEW,
        id, name, level, specialization
    };
}

export function removeInterview(id: string) {
    return {
        type: CONSTANTS.ACTION_REMOVE_INTERVIEW,
        id
    };
}
