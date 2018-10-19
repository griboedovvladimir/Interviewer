import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as actions from './../main-table/actions';
import './Statistic.css'
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {APICallService} from "../../services/APICall.service";
import * as CONSTANTS from '../../constants'
import {StatisticChart} from "../statistic-chart/Statistic-chart";

class Statistic extends Component {
    public props: any;
    public state = {
        cssCards: {cards: [], percentage: undefined, topic: ""},
        htmlCards: {cards: [], percentage: undefined, topic: ""},
        jsCards: {cards: [], percentage: undefined, topic: ""},
        cards: [],
        charts: []
    };

    constructor(props: any, private api: APICallService) {
        super(props);
        this.api = new APICallService();

        if (!this.props.interview[0]) {
            this.api.getInterview().then(res => {
                this.props.action.getInterview(res.reverse());
            });
        }
        this.api.getQuestionCards(this.props.match.params.id).then(res => {
            function getCardsByTopic(topic: string) {
                let cards = res.filter((el: any): boolean => {
                    let returned = false;
                    if (el.topic_name === topic) {
                        returned = true;
                    }
                    return returned
                });

                let percentage = cards.length ? Math.round(cards.reduce((prev: any, el: any) => {
                    return prev + Number(el.mark);
                }, 0) / cards.length) : undefined;

                return {cards, percentage, topic}
            }

            Array.from(new Set(res.map((el: any) => {
                return el.topic_name
            })));

            this.setState({
                cssCards: {...getCardsByTopic('js')},
                htmlCards: {...getCardsByTopic('html')},
                jsCards: {...getCardsByTopic('css')},
                cards: res,
                charts: Array.from(new Set(res.map((el: any) => {
                    return el.topic_name
                })))
            })
        })
    }

    public render() {
        let charts = this.state.charts.map((el: any, i: any) => {
            return <StatisticChart key={el} chartdata={this.state[el + 'Cards']}/>;
        });
        if (this.props.interview[0]) {
            return (
                <div className="page-content">
                    <Breadcrumbs interviewID={this.props.match.params.id}
                                 parent={CONSTANTS.BREADCRUMBS_PARENT_STATISTIC}/>
                    {!!this.state.cards.length ?
                        <div className="charts">
                            {charts}
                        </div> :
                        <div className="interview-placeholder">Interview is empty</div>
                    }
                </div>
            )
        } else {
            return (<h2>...loading</h2>)
        }
    }
}

const mapStateToProps = (state: any, OwnProps: any) => ({
    ...state, ...OwnProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Statistic);