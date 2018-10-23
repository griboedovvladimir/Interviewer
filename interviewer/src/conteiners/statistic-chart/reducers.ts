export function particularQuestion(state: any = {}, action: any) {
    if (action.type === 'SET_PARTICULAR_QUESTION_CARD') {
        return {
            ...action.questionCard
        }
    }
    return state;
}