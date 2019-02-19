import * as actions from './actions';
import * as CONSTANTS from './constants';
import {mount} from "enzyme";
import {Provider} from "react-redux";
import ConnectedMainTableRow from "./Main-table-row";
import * as React from "react";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";
import "isomorphic-fetch";

/*-------------------------- Redux tests -------------------------------*/
describe('main-table-row actions', () => {
    let id = '13';
    it('should create an action to remove interview', () => {
        const expectedAction = {
            type: CONSTANTS.ACTION_REMOVE_INTERVIEW,
            id
        };
        expect(actions.removeInterview(id)).toEqual(expectedAction)
    })
});
/*----------------------- Components tests----------------------------*/

describe('>>>Main-table-row component', () => {
    let store: any, wrapper: any;
    let initialState = {};
    let el = {
        interview_id: "15",
        name: "Some name",
        level: "2",
        specialization: "Front end",
        date: "16.06.12",
        status: "ok",
    };
    const mockStore = configureStore();
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter>
            <table>
                <tbody><ConnectedMainTableRow rowData={el}/></tbody>
            </table>
        </BrowserRouter></Provider>)
    });

    it('render the connected(SMART) MainTableRow component', () => {
        expect(wrapper.find(ConnectedMainTableRow).length).toEqual(1);
    });

    it('when clicking the create icon', () => {
        wrapper.find('#create').simulate('click', {
            preventDefault: () => {
            },
        })
    });

    it('when clicking the visibility icon', () => {
        wrapper.find('#visibility').simulate('click', {
            preventDefault: () => {
            },
        })

    });

    it('when clicking the delete icon', () => {
        wrapper.find('#delete').simulate('click', {
            preventDefault: () => {
            },
        })
    })

});
