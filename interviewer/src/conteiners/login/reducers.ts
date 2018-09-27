import * as CONSTANTS from "./constants";

export function login(state = {logged: false}, action: any) {
    if (action.type === CONSTANTS.ACTION_LOGIN) {
        return {
            logged: action.logged,
        };
    }
    return state;
}