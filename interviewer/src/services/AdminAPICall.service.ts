
// import {IQuestionCard} from "../interfaces/question-card.interface";
// import {InterviewDataInterface} from "../interfaces/InterviewData.interface";
import {APICallService} from "./APICall.service";
import * as CONSTANTS from "../constants";

// const POST_CONFIG = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// };
// const PUT_CONFIG = {
//     method: 'PUT',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// };

export class AdminAPICallService extends APICallService{
    constructor() {
        super();
    }
    public getAllQuestions() {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.GET_ALL_QUESTIONS, {
            method: 'GET'
        }).then(req => req.json());
    }
}