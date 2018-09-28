import * as CONSTANTS from './constants';
import {guid} from "../../helpers/guid";
import {getDateByString} from "../../helpers/getDateByString";
// import {InterviewInterface} from "../../interfaces/interview.interface";

// const defaultProjects: InterviewInterface[] = [{
//     "id" : "101",
//     "name": "Don Aubrey",
//     "specialization" : "Frontend developer",
//     "level" : "1",
//     "date": "06.09.2018",
//     "status": "ok",
// },
//     {
//         "id": "102",
//         "name": "Sophia Carson",
//         "specialization" : "Frontend developer",
//         "level" : "2",
//         "date": "11.09.2018",
//         "status": "ok",
//     },
//     {
//         "id": "103",
//         "name": "Steve Moreno",
//         "specialization" : "Frontend developer",
//         "level" : "2",
//         "date": "03.09.2018",
//         "status": "ok",
//     },
//     {
//         "id": "104",
//         "name": "John Doe",
//         "specialization" : "Frontend developer",
//         "level" : "1",
//         "date": "16.09.2018",
//         "status": "ok",
//     }];

export function interview(state = [], action: any) {
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
    if (action.type === CONSTANTS.ACTION_REMOVE_INTERVIEW) {
        return state.filter((el:any)=>{
            return el.id !== action.id;
       });
}
    if (action.type === CONSTANTS.ACTION_GET_INTERVIEW) {
        return [...state, ...action.interviews]
    }
    return state;
}