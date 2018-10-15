import * as actions from './actions';
import * as CONSTANTS from '../main/constants';

const interviewObj = {
    interview_id: "15",
    name: "Some name",
    level: "2",
    specialization: "Front end",
    date: "16.06.12",
    status: "ok",
};
/*-------------------------- Redux tests -------------------------------*/
describe('main-table actions', () => {
    let interviews = [interviewObj, interviewObj];
    it('should create an action to get interviews', () => {
        const expectedAction = {
            type: CONSTANTS.ACTION_GET_INTERVIEW,
            interviews
        };
        expect(actions.getInterview(interviews)).toEqual(expectedAction)
    })
});