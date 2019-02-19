import {mount} from "enzyme";
import ConnectedStatisticChart from "./Statistic-chart";
import * as React from "react";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import "isomorphic-fetch";


let initialState = {
    chartdata: {
        questionId: 16,
        interviewId: "15",
        topic: "css",
        mark: "70",
        comment: "text"
    }
};


const mockStore = configureStore();

describe('>>>StatisticChart component', () => {
    let store: any, wrapper: any;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><BrowserRouter><ConnectedStatisticChart chartdata={{
            questionId: 16,
            interviewId: "15",
            topic: "css",
            mark: "70",
            comment: "text"
        }
        }
                                                                                        interviewID={'15'}/></BrowserRouter></Provider>)
    });

    it('render the connected(SMART) StatisticChart component', () => {
        expect(wrapper.find(ConnectedStatisticChart).length).toEqual(1)
    });
    expect(wrapper).toMatchSnapshot();
});