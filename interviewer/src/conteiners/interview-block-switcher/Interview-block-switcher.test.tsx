import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import ConnectedInterviewBlockSwitcher from "./Interview-block-switcher";
import * as React from "react";
import "isomorphic-fetch";

let store: any, wrapper: any;

let initialState = {};
let getCurrentQuestionBlock = jest.fn();

describe('>>>InterviewBlockSwitcher component', () => {
    const mockStore = configureStore();
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedInterviewBlockSwitcher
            total= "16"
            questionNumber= "15"
            updateData={getCurrentQuestionBlock}
        /></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) InterviewBlockSwitcher component', () => {
        expect(wrapper.find(ConnectedInterviewBlockSwitcher).length).toEqual(1)
    });

    it('when clicking the CSSSwitcherBlock button', () => {
        wrapper.find('#CSSSwitcherBlock').simulate('click', {
            preventDefault: () => {
            },
        });
    });

    it('when clicking the HTMLSwitcherBlock button', () => {
        wrapper.find('#HTMLSwitcherBlock').simulate('click', {
            preventDefault: () => {
            },
        });
        expect(getCurrentQuestionBlock).toHaveBeenCalled()
    });

    it('when clicking the JSSwitcherBlock button', () => {
        wrapper.find('#JSSwitcherBlock').simulate('click', {
            preventDefault: () => {
            },
        });
        expect(getCurrentQuestionBlock).toHaveBeenCalled()
    });

    it('when clicking the JSSwitcherBlock button', () => {
        wrapper.find('#JSSwitcherBlock div').simulate('click', {
            preventDefault: () => {
            },
        });
        expect(getCurrentQuestionBlock).toHaveBeenCalled()
    });
});