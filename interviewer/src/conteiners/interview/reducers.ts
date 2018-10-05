import * as CONSTANTS from './constants';


export function question(state = {
    currentQuestionNumber: 1,
    raiting: '',
    text: '',
    source: '',
    question_id: 0,
    subtopic_id: 0
}, action: any) {
    if (action.type === CONSTANTS.ACTION_GET_QUESTION) {
        return {...action.question}
    }
    return state;
}