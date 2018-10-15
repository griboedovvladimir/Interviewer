// import React from 'react'
// import Enzyme, { mount } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import Main from './Main-page'
import * as actions from './actions';
import * as CONSTANTS from './constants';
import {interview} from './reducers';

const interviewObj = {
    interview_id: "15",
    name: "Some name",
    level: "2",
    specialization: "Front end",
    date: "16.06.12",
    status: "ok",
};
/*-------------------------- Redux tests -------------------------------*/
describe('main actions', () => {
    it('should create an action to add a interview', () => {
        const expectedAction = {
            type: CONSTANTS.ACTION_ADD_INTERVIEW,
            ...interviewObj
        };
        expect(actions.addInterview(interviewObj)).toEqual(expectedAction)
    })
});


describe('main reducers', () => {
    it('should handle ACTION_ADD_INTERVIEW', () => {
        expect(
            interview([], {
                type: CONSTANTS.ACTION_ADD_INTERVIEW,
                ...interviewObj
            })
        ).toEqual([interviewObj]);

        expect(
            interview([interviewObj], {
                type: CONSTANTS.ACTION_ADD_INTERVIEW,
                ...interviewObj
            })
        ).toEqual([interviewObj, interviewObj])

        expect(
            interview(undefined, {
                type: CONSTANTS.ACTION_ADD_INTERVIEW,
                ...interviewObj
            })
        ).toEqual([interviewObj])
    });

    it('should handle ACTION_REMOVE_INTERVIEW', () => {
        let id = interviewObj.interview_id;
        expect(
            interview([interviewObj], {
                type: CONSTANTS.ACTION_REMOVE_INTERVIEW,
                id
            })
        ).toEqual([])
    });

    it('should handle ACTION_GET_INTERVIEW', () => {
        let interviews = [interviewObj, interviewObj];
        expect(
            interview([], {
                type: CONSTANTS.ACTION_GET_INTERVIEW,
                interviews
            })
        ).toEqual([interviewObj, interviewObj]);
        expect(
            interview([], {
                type: "",
                interviews
            })
        ).toEqual([])
    });

});
/*----------------------- Components tests----------------------------*/
