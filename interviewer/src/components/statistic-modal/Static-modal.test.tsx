import {shallow} from "enzyme";
import {StatisticModal} from "./Statistic-modal";
import * as React from "react";
import "isomorphic-fetch";

const questionObj = {
    question_id: '15',
    subtopic_id: '2',
    ratting: '7',
    text: 'text',
    source: 'text'
};

let wrapper:any;
describe('>>>StatisticModal component', () => {
    beforeEach(() => {
        wrapper = shallow(<StatisticModal particularQuestion = {[questionObj]} />)
    });

    it('render simple StatisticModal component', () => {
        expect(wrapper.find('div.remove').length);
        expect(wrapper).toMatchSnapshot();
    });

});