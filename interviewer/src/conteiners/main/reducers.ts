import * as CONSTANTS from './constants';
import {InterviewInterface} from "../../interfaces/interview.interface";


export function interview(state = [], action: any) {
    if (action.type === CONSTANTS.ACTION_ADD_INTERVIEW) {
        return [
            ...state,
            {
                interview_id: action.interview_id,
                name: action.name,
                level: action.level,
                specialization: action.specialization,
                date: action.date,
                status: action.status
            }
        ];
    }
    if (action.type === CONSTANTS.ACTION_REMOVE_INTERVIEW) {
        return state.filter((el:InterviewInterface)=>{
            return el.interview_id !== action.id;
       });
}
    if (action.type === CONSTANTS.ACTION_GET_INTERVIEW) {
        return [...state, ...action.interviews]
    }
    return state;
}