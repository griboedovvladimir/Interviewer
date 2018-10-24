import * as actions from './actions';
import * as CONSTANTS from './constants';
import {interview} from './reducers';
import {mount} from "enzyme";
import ConnectedMainPage from "./Main-page";
import * as React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import ConnectedMenu from "../menu/Menu";

const interviewObj = {
    interview_id: "15",
    name: "Some name",
    level: "2",
    specialization: "Front end",
    date: "16.06.12",
    status: "ok",
};
/*-------------------------- Redux tests -------------------------------*/
describe('main actions', () => {
    it('should create an action to add a interview', () => {
        const expectedAction = {
            type: CONSTANTS.ACTION_ADD_INTERVIEW,
            ...interviewObj
        };
        expect(actions.addInterview(interviewObj)).toEqual(expectedAction)
    })
});


describe('main reducers', () => {
    it('should handle ACTION_ADD_INTERVIEW', () => {
        expect(
            interview([], {
                type: CONSTANTS.ACTION_ADD_INTERVIEW,
                ...interviewObj
            })
        ).toEqual([interviewObj]);

        expect(
            interview([interviewObj], {
                type: CONSTANTS.ACTION_ADD_INTERVIEW,
                ...interviewObj
            })
        ).toEqual([interviewObj, interviewObj]);

        expect(
            interview(undefined, {
                type: CONSTANTS.ACTION_ADD_INTERVIEW,
                ...interviewObj
            })
        ).toEqual([interviewObj])
    });

    it('should handle ACTION_REMOVE_INTERVIEW', () => {
        let id = interviewObj.interview_id;
        expect(
            interview([interviewObj], {
                type: CONSTANTS.ACTION_REMOVE_INTERVIEW,
                id
            })
        ).toEqual([])
    });

    it('should handle ACTION_GET_INTERVIEW', () => {
        let interviews = [interviewObj, interviewObj];
        expect(
            interview([], {
                type: CONSTANTS.ACTION_GET_INTERVIEW,
                interviews
            })
        ).toEqual([interviewObj, interviewObj]);
        expect(
            interview([], {
                type: "",
                interviews
            })
        ).toEqual([])
    });

});

/*----------------------- Components tests----------------------------*/

describe('>>>Main component logged===true', () => {
    let store: any, wrapper: any;
    let initialState ={login:{logged:true}};

    const mockStore = configureStore();
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedMainPage/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Main-page component', () => {
        expect(wrapper.find(ConnectedMenu).length).toEqual(1);
    });

});

describe('>>>Main component logged===false', () => {
    let store: any, wrapper: any;
    let initialState ={login:{logged:false}};

    const mockStore = configureStore();
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedMainPage/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Main-page component', () => {
        expect(wrapper.find(ConnectedMenu).length).toEqual(0);
    });

});