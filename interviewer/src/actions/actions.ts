import * as CONSTANTS from '../constants';

export function login(logged: string) {
    return {
        type: CONSTANTS.ACTION_LOGIN,
        logged
    };
}

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
