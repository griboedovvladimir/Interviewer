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

    public getQuestionById(questionId: number) {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.QUESTION_BY_ID_PATH + '/'+ questionId, {
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

    public getQuestionCards(interviewId:number) {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.QUESTION_CARDS + '/' + interviewId, {
            method: 'GET'
        }).then(req => req.json());
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

    public checkRights(token:any){
        return fetch(CONSTANTS.API_HOST + CONSTANTS.RIGHTS_CHECK, {
            ...POST_CONFIG,
            body: JSON.stringify({"token":token})
        }).then(req => req.json());
    }

    public getExcel(interviewId:any) {
        return fetch(CONSTANTS.API_HOST + CONSTANTS.GET_EXCEL_PATH, {
            ...POST_CONFIG,
            body: JSON.stringify({"interviewId":interviewId})
        }).then(req => req.blob());
    }

    public getPrint(interviewId:any){
        return fetch(CONSTANTS.API_HOST + CONSTANTS.GET_PRINT_PATH, {
            ...POST_CONFIG,
            body: JSON.stringify({"interviewId":interviewId})
        }).then(req => req.json());
    }

    public getUserEmail(){
        return fetch(CONSTANTS.API_HOST + CONSTANTS.GET_USER_EMAIL, {
            ...POST_CONFIG,
            body: JSON.stringify({"token":localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY_AUTH_KEY)})
        }).then(req => req.json());
    }

    public sendByEmail(interviewId:any,userEmail:string){
        return fetch(CONSTANTS.API_HOST + CONSTANTS.SEND_EMAIL_PATH, {
            ...POST_CONFIG,
            body: JSON.stringify({"interviewId":interviewId, "email":userEmail})
        }).then(req => req.json());
    }
    public markIntervewAsCompleted(interviewId:any){
        return fetch(CONSTANTS.API_HOST + CONSTANTS.SET_INTERVIEW_STATUS + '/' + interviewId, {
            method: 'GET'
        });
    }
}