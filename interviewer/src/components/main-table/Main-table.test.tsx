import * as actions from './actions';
import * as CONSTANTS from '../main/constants';
import * as React from "react";
import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import ConnectedMainTable from "./Main-table";
import "isomorphic-fetch";

const interviewObj = {
    interview_id: "15",
    name: "Some name",
    level: "2",
    specialization: "Front end",
    date: "16.06.12",
    status: "ok",
};
/*-------------------------- Redux tests -------------------------------*/
describe('main-table actions', () => {
    let interviews = [interviewObj];
    it('should create an action to get interviews', () => {
        const expectedAction = {
            type: CONSTANTS.ACTION_GET_INTERVIEW,
            interviews
        };
        expect(actions.getInterview(interviews)).toEqual(expectedAction)
    })
});

/*----------------------- Components tests----------------------------*/

let initialState = {interview:[interviewObj]};
let store: any, wrapper: any;
const mockStore = configureStore();

describe('>>>MainTable component', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedMainTable /></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) MainTable component', () => {
        expect(wrapper.find(ConnectedMainTable).length).toEqual(1)
        expect(wrapper).toMatchSnapshot();
    });

    it("when clicking the add-btn", () => {
        beforeEach(() => {
            const spy = jest.spyOn(wrapper.instance(), 'modalActivate()');
            wrapper.find('button mdc-button mdc-button--raised"]').simulate('click', {
                preventDefault: () => {
                },
            });
            expect(spy).toHaveBeenCalled();
            expect(wrapper.find('#overlay').length);
            expect(wrapper).toMatchSnapshot();
        });
    });

});