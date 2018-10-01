import * as CONSTANTS from "./constants";
import * as ROOT_CONSTANTS from "../../constants";

export function login(state = {logged: !!localStorage.getItem(ROOT_CONSTANTS.LOCAL_STORAGE_KEY_AUTH_KEY)}, action: any) {
    if (action.type === CONSTANTS.ACTION_LOGIN) {
        return {
            logged: action.logged,
        };

    }
    if (action.type === CONSTANTS.ACTION_LOGOUT) {
        return {
            logged: action.logged,
        };

    }
    return state;
}