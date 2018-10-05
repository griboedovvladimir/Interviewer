import * as CONSTANTS from "./constants";

export function getQuestion(question: any) {
    return {
        type: CONSTANTS.ACTION_GET_QUESTION,
        question
    };
}

export function getInterview(interviews: any) {
    return {
        type: CONSTANTS.ACTION_GET_INTERVIEW,
        interviews
    };
}