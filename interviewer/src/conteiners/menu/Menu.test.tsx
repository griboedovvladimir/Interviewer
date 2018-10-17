import {mount, shallow} from "enzyme";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import ConnectedMenu,{Menu} from "./Menu";
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import * as CONSTANTS from '../../constants'
import {AuthorizationService} from "../../services/authorization.service";

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

    it('lifecycle method should have been called', () => {
        const componentDidMount = jest.fn();
        const componentWillUnmount = jest.fn();

        class Foo extends Menu {
            constructor(props:any) {
                // @ts-ignore
                super(props, AuthorizationService);
                this.componentDidMount = componentDidMount;
                this.componentWillUnmount = componentWillUnmount
            }

            render() {
                return (<Menu  />)
            }
        }

        const wrapper = shallow(<Foo />);

        expect(componentDidMount.mock.calls.length).toBe(1);
        expect(componentWillUnmount.mock.calls.length).toBe(0);

        wrapper.unmount();

        expect(componentDidMount.mock.calls.length).toBe(1);
        expect(componentWillUnmount.mock.calls.length).toBe(1)
    });

});

