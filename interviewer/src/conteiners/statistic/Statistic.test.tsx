import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import ConnectedStatistic from "./Statistic";
import * as React from "react";
import "isomorphic-fetch";

let initialState = {
    interview: [{
        interview_id: "15",
        name: "Some name",
        level: "2",
        specialization: "Front end",
        date: "16.06.12",
        status: "ok",
    }],
    match:{params:{id: "15"}}
};
let store: any, wrapper: any;
const mockStore = configureStore();

describe('>>>Statistic component', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedStatistic /></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Statistic component', () => {
        expect(wrapper.find(ConnectedStatistic).length).toEqual(1)
    });

    it('render the connected(SMART) Statistic component and init charts', () => {
        expect(wrapper.find('#chartScript').length)
    });
});

initialState.interview=[];
describe('>>>Statistic component initialState===[]', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedStatistic /></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) Statistic component', () => {
        expect(wrapper.find(ConnectedStatistic).length).toEqual(1)
    });
});