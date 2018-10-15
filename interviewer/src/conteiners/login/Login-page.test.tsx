import * as React from 'react';
import { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16'
// import Main from './Main-page'
import * as actions from './actions';
import * as CONSTANTS from './constants';
import {login} from "./reducers";

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
import {LoginPage} from './Login-page';


describe("<LoginPage />  UI Component", ()=>{
    it("render default login-page", ()=>{
        shallow(<LoginPage/>)
            .find('div.form-wrapper')
            .length
    });
});