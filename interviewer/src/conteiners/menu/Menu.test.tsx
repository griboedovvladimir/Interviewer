import {mount} from "enzyme";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import ConnectedMenu from "./Menu";
import * as React from "react";
import {BrowserRouter} from "react-router-dom";


describe('>>>Menu component', () => {
    let store: any, wrapper: any;
    let initialState = {};

    const mockStore = configureStore();
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedMenu parent={'main'}/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Menu component', () => {
        expect(wrapper.find(ConnectedMenu).length).toEqual(1)
    });

    it('when clicking the main-item', () => {
        wrapper.find('#main_item').simulate('click', {
            preventDefault: () => {
            },
        })

    })

});