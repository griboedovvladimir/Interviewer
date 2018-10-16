import {mount} from "enzyme";
import ConnectedBreadcrumbs from "./Breadcrumbs";
import * as React from "react";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";


let initialState = {
    interview: [{
        interview_id: "15",
        name: "Some name",
        level: "2",
        specialization: "Front end",
        date: "16.06.12",
        status: "ok",
    },{
        interview_id: "16",
        name: "Some name",
        level: "2",
        specialization: "Front end",
        date: "16.06.12",
        status: "ok",
    }]
};
const mockStore = configureStore();

describe('>>>Breadcrumbs --- REACT-REDUX (Mount + wrapping in <Provider> with  parent=>interview)', () => {
    let store: any, wrapper: any;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedBreadcrumbs parent={'interview'}
                                                                                     interviewID={'15'}/></BrowserRouter></Provider>)
    });


    it('render the connected(SMART) Breadcrumbs component', () => {
        expect(wrapper.find(ConnectedBreadcrumbs).length).toEqual(1)
    });

    it('when clicking the toInterview chip', () => {
        wrapper.find('#toInterview').simulate('click', {
            preventDefault: () => {
            },
        })
    });

    it('when clicking the toStatistic chip', () => {
        wrapper.find('#toStatistic').simulate('click', {
            preventDefault: () => {
            },
        })

    })

});


describe('>>>Breadcrumbs --- REACT-REDUX (Mount + wrapping in <Provider> with  parent=>statistic)', () => {
    let store: any, wrapper: any;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedBreadcrumbs parent={'statistic'}
                                                                                     interviewID={'15'}/></BrowserRouter></Provider>)
    });


    it('render the connected(SMART) Breadcrumbs component', () => {
        expect(wrapper.find(ConnectedBreadcrumbs).length).toEqual(1)
    });

    it('when clicking the toInterview chip', () => {
        wrapper.find('#toInterview').simulate('click', {
            preventDefault: () => {
            },
        })
    });

    it('when clicking the toStatistic chip', () => {
        wrapper.find('#toStatistic').simulate('click', {
            preventDefault: () => {
            },
        })

    })

});

describe('>>>Breadcrumbs --- REACT-REDUX (Mount + wrapping in <Provider> with  parent=>undefined)', () => {
    let store: any, wrapper: any;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedBreadcrumbs parent={''}
                                                                                     interviewID={'15'}/></BrowserRouter></Provider>)
    });


    it('render the connected(SMART) Breadcrumbs component', () => {
        expect(wrapper.find(ConnectedBreadcrumbs).length).toEqual(1)
    });
});

