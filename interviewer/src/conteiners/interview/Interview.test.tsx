// import React from 'react'
// import Enzyme, { mount } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import Main from './Main-page'
import * as actions from './actions';
import * as CONSTANTS from './constants';
import {interview} from "../main/reducers";
import {dirty} from "./reducers";
import * as reducers from "./reducers";
import {IQuestionInterface} from "../../interfaces/question.interface";

const questionReducer = reducers.question;

const questionObj = {
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
        // @ts-ignore
        let question = questionObj;
        const expectedAction = {
            type: CONSTANTS.ACTION_GET_QUESTION,
            question
        };
        expect(actions.getQuestion(question)).toEqual(expectedAction)
    });

    it('should create an action to get a interview', () => {
        let interviews = [interviewObj, interviewObj];
        const expectedAction = {
            type: CONSTANTS.ACTION_GET_INTERVIEW,
            interviews
        };
        expect(actions.getInterview(interviews)).toEqual(expectedAction)
    });

    it('should create an action to get a dirtyQuestion', () => {
        let dirtyQuestion = questionObj;
        const expectedAction = {
            type: CONSTANTS.ACTION_GET_DIRTY_QUESTION,
            dirtyQuestion
        };
        expect(actions.getDirtyQuestion(dirtyQuestion)).toEqual(expectedAction)
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


    it('should handle ACTION_GET_DIRTY_QUESTION', () => {
        let dirtyQuestion = questionObj;
        expect(
            dirty({}, {
                type: CONSTANTS.ACTION_GET_DIRTY_QUESTION,
                dirtyQuestion
            })
        ).toEqual(dirtyQuestion);

        expect(
            dirty(questionObj, {
                type: CONSTANTS.ACTION_GET_DIRTY_QUESTION,
                dirtyQuestion
            })
        ).toEqual(dirtyQuestion);

        expect(
            dirty(undefined, {
                type: CONSTANTS.ACTION_GET_DIRTY_QUESTION,
                dirtyQuestion
            })
        ).toEqual(dirtyQuestion);

        expect(
            dirty(questionObj, {
                type: " ",
                dirtyQuestion
            })
        ).toEqual(dirtyQuestion)
    });

    it('should handle ACTION_GET_QUESTION', () => {
        let question = questionObj;
        let state = {
            currentQuestionNumber: 1,
            ratting: '',
            text: '',
            source: '',
            question_id: 0,
            subtopic_id: 0
        };
        expect(
            questionReducer({} as IQuestionInterface, {
                type: CONSTANTS.ACTION_GET_QUESTION,
                question
            })
        ).toEqual(question);

        expect(
            questionReducer(state, {
                type: CONSTANTS.ACTION_GET_QUESTION,
                question
            })
        ).toEqual(question);

        expect(
            questionReducer(undefined, {
                type: CONSTANTS.ACTION_GET_QUESTION,
                question
            })
        ).toEqual(question);

        expect(
            questionReducer({} as IQuestionInterface, {
                type: "",
                question
            })
        ).toEqual({});

    });
});

/*----------------------- Components tests----------------------------*/
