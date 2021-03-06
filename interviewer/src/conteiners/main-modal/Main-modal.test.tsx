import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import MainModal from "./Main-modal";
import * as React from "react";
import "isomorphic-fetch";

describe('>>>MainModal component', () => {
    let store: any, wrapper: any;
    let initialState = {};

    const mockStore = configureStore();
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><MainModal /></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) MainModal component', () => {
        expect(wrapper.find(MainModal).length).toEqual(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('when clicking AddInterview-button', () => {
        afterEach(() => {
            wrapper.find('[name="AddInterview"]').simulate('click', {
                preventDefault: () => {},
            })
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('when clicking submitting', () => {
        afterEach(() => {
            wrapper.find('form').simulate('submit', {
                preventDefault: () => {},
            })
        });
        expect(wrapper).toMatchSnapshot();
    });
});