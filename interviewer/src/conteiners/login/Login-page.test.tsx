import * as React from 'react';
import {mount} from 'enzyme';
import * as actions from './actions';
import * as CONSTANTS from './constants';
import {login} from "./reducers";
import "isomorphic-fetch";

const logged = true;
/*-------------------------- Redux tests -------------------------------*/
describe('login actions', () => {
    it('should change boolean value logged', () => {
        const expectedAction = {
            type: CONSTANTS.ACTION_LOGIN,
            logged
        };
        expect(actions.login(logged)).toEqual(expectedAction)
    })
});

describe('login reducers', () => {
    it('should handle ACTION_LOGIN', () => {
        expect(
            login({logged: false}, {
                type: CONSTANTS.ACTION_LOGIN,
                logged: true
            })
        ).toEqual({logged: true});

        expect(
            login({logged: false}, {
                type: CONSTANTS.ACTION_LOGIN,
                logged: true
            })
        ).toEqual({logged: true});

        expect(
            login(undefined, {
                type: CONSTANTS.ACTION_LOGIN,
                logged: true
            })
        ).toEqual({logged: true});

        expect(
            login({logged: false}, {
                type: '',
                logged: true
            })
        ).toEqual({logged: false})

    });

    it('should handle ACTION_LOGOUT', () => {
        expect(
            login({logged: false}, {
                type: CONSTANTS.ACTION_LOGOUT,
                logged: true
            })
        ).toEqual({logged: true});

        expect(
            login({logged: false}, {
                type: CONSTANTS.ACTION_LOGIN,
                logged: true
            })
        ).toEqual({logged: true});

        expect(
            login({logged: true}, {
                type: '',
                logged: false
            })
        ).toEqual({logged: true})
    });


});
/*----------------------- Components tests----------------------------*/
import ConnectedLoginPage from './Login-page';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

let store: any, wrapper: any;
let initialState = {login: {logged: true}};
let mockStore = configureStore();

describe("<LoginPage />  UI Component", () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedLoginPage/></BrowserRouter></Provider>)
    });

    it("render default login-page", () => {
        expect(wrapper.find(ConnectedLoginPage).length).toEqual(1)
        expect(wrapper).toMatchSnapshot();
    });

});

initialState = {login: {logged: false}};
mockStore = configureStore();
describe("<LoginPage />  UI Component", () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedLoginPage/></BrowserRouter></Provider>)
    });

    it("render default login-page wit logged === false", () => {
        expect(wrapper.find(ConnectedLoginPage).length).toEqual(1)
        expect(wrapper).toMatchSnapshot();
    });

    it("when clicking the login-btn", () => {
        expect(wrapper).toMatchSnapshot();
        beforeEach(() => {
            wrapper.find('[name="login-btn"]').simulate('click', {
                preventDefault: () => {
                },
            })
        });
        expect(wrapper).toMatchSnapshot();
    });

    it("when submitting the form", () => {
        expect(wrapper).toMatchSnapshot();
        beforeEach(() => {
            wrapper.find('form').simulate('submit', {
                preventDefault: () => {
                },
            })
        });
    });
    expect(wrapper).toMatchSnapshot();
});




