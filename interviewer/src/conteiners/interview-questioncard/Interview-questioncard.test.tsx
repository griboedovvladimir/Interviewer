import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import ConnectedInterviewQuestionCard from "./Interview-questioncard";
import * as React from "react";
import "isomorphic-fetch";

let store: any, wrapper: any;
let questionObj = {
    question_id: '15',
    subtopic_id: '2',
    ratting: '7',
    text: 'text',
    source: 'text'
};
let initialState = {};
let switchQuestion = jest.fn();

describe('>>>InterviewQuestionCard component', () => {
    const mockStore = configureStore();
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedInterviewQuestionCard
            interviewID="15" updateData={switchQuestion} question={questionObj}/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) InterviewQuestionCard component', () => {
        expect(wrapper.find(ConnectedInterviewQuestionCard).length).toEqual(1)
    });

    it('when clicking the visibility icon', () => {
        wrapper.find('#left-arrow').simulate('click', {
            preventDefault: () => {
            },
        });
        expect(switchQuestion.mock.calls.length).toBe(1);

    });

    it('when clicking the visibility icon', () => {
        wrapper.find('#right-arrow').simulate('click', {
            preventDefault: () => {
            },
        });
        expect(switchQuestion.mock.calls.length).toBe(2);
    });

});