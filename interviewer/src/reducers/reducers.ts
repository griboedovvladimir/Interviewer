import * as CONSTANTS from '../constants';
import {guid} from "../helpers/guid";
import {getDateByString} from "../helpers/getDateByString";
import {InterviewInterface} from "../interfaces/interview.interface";

const defultProjects: InterviewInterface[] = [];

export function login(state = {logged: 'false'}, action: any) {
    if (action.type === CONSTANTS.ACTION_LOGIN) {
        return {
            logged: action.logged,
        };
    }
    return state;
}

export function interview(state = defultProjects, action: any) {
    if (action.type === CONSTANTS.ACTION_ADD_INTERVIEW) {
        return [
            {
                id: guid(),
                name: action.name,
                level: action.level,
                specialization: action.specialization,
                date: getDateByString(),
                status: 'ok'
            },
            ...state
        ];
    }
    return state;
}