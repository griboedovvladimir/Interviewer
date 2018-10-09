import * as CONSTANTS from '../constants'
import {IQuestionCard} from "../interfaces/question-card.interface";
import {InterviewDataInterface} from "../interfaces/InterviewData.interface";

const POST_CONFIG = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
const PUT_CONFIG = {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};


export class APICallService {

    public getInterview() {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.INTERVIE_PATH, {
            method: 'GET'
        }).then(req => req.json());
    }

    public removeInterview(id: string) {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.INTERVIE_PATH + '/' + id, {
            method: 'DELETE'
        });
    }

    public addInterview(interview: InterviewDataInterface) {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.INTERVIE_PATH, {
            ...POST_CONFIG,
            body: JSON.stringify(interview)
        }).then(req => req.json());
    }

    public getQuestions(blockName: string, question: number) {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.QUESTION_PATH + '?id=' + blockName + '&question=' + question, {
            method: 'GET'
        }).then(req => req.json());
    }

    public createQuestionCard(questionCard: IQuestionCard) {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.QUESTION_CARD, {
            ...POST_CONFIG,
            body: JSON.stringify(questionCard)
        });
    }

    public editQuestionCard(questionCard: IQuestionCard) {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.QUESTION_CARD, {
            ...PUT_CONFIG,
            body: JSON.stringify(questionCard)
        });
    }

    public checkQuestionCard(questionId: number, interviewId: number) {
        let body = {questionId, interviewId};
        return fetch(CONSTANTS.API_HOST + CONSTANTS.QUESTION_CARD_CHECK, {
            ...POST_CONFIG,
            body: JSON.stringify(body)
        }).then(req => req.json());
    }

    public checkUser(name: string, pass: string) {
        let body = {name, pass};
        return fetch(CONSTANTS.API_HOST + CONSTANTS.LOGGED_API_PATH, {
            ...POST_CONFIG,
            body: JSON.stringify(body)
        })
    }
}