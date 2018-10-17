import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import InterviewEvaluate from "./Interview-evaluate";
import * as React from "react";
import "isomorphic-fetch";

let store: any, wrapper: any;
let initialState = {
    dirty: {
        questionId: 16,
        interviewId: "15",
        topic: "css",
        mark: "70",
        comment: "text"
    },question:{
        question_id: '15',
        subtopic_id: '2',
        ratting: '7',
        text: 'text',
        source: 'text'
    }
};
describe('>>>InterviewEvaluate component', () => {
    const mockStore = configureStore();
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><InterviewEvaluate
            interviewID="15"/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Interviewevaluate component', () => {
        expect(wrapper.find(InterviewEvaluate).length).toEqual(1)
    });

});

describe('>>>InterviewEvaluate component without props', () => {
    initialState.dirty.mark = "";
    const mockStore = configureStore();
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><InterviewEvaluate
            interviewID="15"/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Interviewevaluate component  without props', () => {
        expect(wrapper.find(InterviewEvaluate).length).toEqual(1)
    });

    it('when submitting evaluate', () => {
        beforeEach(() => {
            wrapper.find('form').simulate('submit', {
                preventDefault: () => {},
            })
        });
    });

    // it('when clicking evaluate-button', () => {
    //     beforeEach(() => {
    //         wrapper.find('[name="btn"]').simulate('click', {
    //             preventDefault: () => {}
    //         })
    //     });
    // });
});