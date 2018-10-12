// import React from 'react'
// import Enzyme, { mount } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import Main from './Main-page'
import * as actions from './actions';
import * as CONSTANTS from './constants';
import {interview} from "../main/reducers";

const question = {
    question_id: '15',
    subtopic_id: '2',
    ratting: '7',
    text: 'text',
    source: 'text'
};

const interviewObj = {
    interview_id: "15",
    name: "Some name",
    level: "2",
    specialization: "Front end",
    date: "16.06.12",
    status: "ok",
};
/*-------------------------- Redux tests -------------------------------*/
describe('interview actions', () => {
    it('should create an action to get a question', () => {
        const expectedAction = {
            type: CONSTANTS.ACTION_GET_QUESTION,
            question
        };
        expect(actions.getQuestion(question)).toEqual(expectedAction)
    });

    it('should handle ACTION_GET_INTERVIEW', () => {
        let interviews = [interviewObj, interviewObj];
        expect(
            interview([], {
                type: CONSTANTS.ACTION_GET_INTERVIEW,
                interviews
            })
        ).toEqual([interviewObj, interviewObj])
    });
});

/*----------------------- Components tests----------------------------*/
