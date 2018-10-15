import * as CONSTANTS from './constants';


export function question(state = {
    currentQuestionNumber: 1,
    ratting: '',
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

export function dirty(state={},action:any){
    if (action.type === CONSTANTS.ACTION_GET_DIRTY_QUESTION) {
        return  {...action.dirtyQuestion}
    }
    return state;
}
