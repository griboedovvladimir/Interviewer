import {INTERVIEW_DATA} from "./INTERVIEW_DATA";
import {USER_DATA} from "./USER_DATA";

const ID_LS_KEY = 'INTERVIEW_DATA';
const UD_LS_KEY = 'USER_DATA';
let singletonInstance = null;

export class StoreService {

    constructor() {

        if (!singletonInstance) {
            singletonInstance = this;
        }
        this.interviewData = localStorage.getItem(ID_LS_KEY) ? JSON.parse(localStorage.getItem(ID_LS_KEY)) : INTERVIEW_DATA;
        this.userData = localStorage.getItem(UD_LS_KEY) ? JSON.parse(localStorage.getItem(UD_LS_KEY)) : USER_DATA;
        this.instance = this;

        return singletonInstance;
    }


    setInterviewData(data) {
        this.interviewData.unshift(data);
        localStorage.setItem(ID_LS_KEY, JSON.stringify(this.interviewData))
    }

    getInterviewData() {
        return this.interviewData
    }

    deleteInterviewData(id) {
        this.interviewData.forEach((el, i, arr) => {
            if (el.id.toString() === id) {
                this.interviewData.splice(i, 1);
                localStorage.setItem(ID_LS_KEY, JSON.stringify(this.interviewData))
            }
        });
    }

    setUserData(data) {

    }

    getUserData() {
        return this.userData;
    }
}