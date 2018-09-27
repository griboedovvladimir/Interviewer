import * as CONSTANTS from "./constants"

export function login(logged: boolean) {
    return {
        type: CONSTANTS.ACTION_LOGIN,
        logged
    };
}