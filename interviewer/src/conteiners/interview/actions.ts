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


export function getDirtyQuestion(dirtyQuestion: any) {
    return {
        type: CONSTANTS.ACTION_GET_DIRTY_QUESTION,
        dirtyQuestion
    };
}