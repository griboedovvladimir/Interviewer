import {mount} from "enzyme";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import ConnectedMenu from "./Menu";
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import * as CONSTANTS from '../../constants'

let initialState = {};
let store: any, wrapper: any;
const mockStore = configureStore();
describe('>>>Menu component with parent===main', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedMenu parent={CONSTANTS.MENU_ITEM_MAIN}/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Menu component', () => {
        expect(wrapper.find(ConnectedMenu).length).toEqual(1)
    });

    it('when clicking the main-item', () => {
        wrapper.find('#main_item').simulate('click', {
            preventDefault: () => {
            },
        })
    });

    it('when clicking the logout-item', () => {
        wrapper.find('#logout_item').simulate('click', {
            preventDefault: () => {
            },
        })
    })

});

describe('>>>Menu component with parent===interview', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedMenu parent={CONSTANTS.MENU_ITEM_INTERVIEW}/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Menu component', () => {
        expect(wrapper.find(ConnectedMenu).length).toEqual(1)
    });
});

describe('>>>Menu component with parent===statistic', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedMenu parent={CONSTANTS.MENU_ITEM_STATISTIC}/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Menu component', () => {
        expect(wrapper.find(ConnectedMenu).length).toEqual(1)
    });
});

describe('>>>Menu component -> test componentWillUnmount', () => {

    it('calls componentWillUnmount',() => {
        const spy = jest.spyOn(ConnectedMenu.prototype, 'componentWillUnmount');
        beforeEach(() => {
            store = mockStore(initialState);
            wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedMenu parent={CONSTANTS.MENU_ITEM_STATISTIC}/></BrowserRouter></Provider>)
        });

        wrapper.unmount();
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
    });

});

