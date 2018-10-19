import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as actions from './../main-table/actions';
import './Statistic.css'
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {APICallService} from "../../services/APICall.service";
import * as CONSTANTS from '../../constants'
import {chart} from './chart';

class Statistic extends Component {
    public props: any;
    public state = {
        cssCards: {cards: [], percentage: undefined},
        htmlCards: {cards: [], percentage: undefined},
        jsCards: {cards: [], percentage: undefined},
        cards: []
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

                return {cards, percentage}
            }

            this.setState({
                cssCards: {...getCardsByTopic('js')},
                htmlCards: {...getCardsByTopic('html')},
                jsCards: {...getCardsByTopic('css')},
                cards: res
            })
        })
    }

    public chartInit() {
        let script = document.createElement('script');
        script.setAttribute("defer", "defer");
        script.id = 'chartScript';
        script.innerHTML = chart;
        document.body.appendChild(script);
    }

    public componentDidMount() {
        setTimeout(this.chartInit, 0);
    }

    public render() {
        if (this.props.interview[0]) {
            return (
                <div className="page-content">
                    <Breadcrumbs interviewID={this.props.match.params.id}
                                 parent={CONSTANTS.BREADCRUMBS_PARENT_STATISTIC}/>
                    {!!this.state.cards.length ?

                        <div className="charts">
                            <div className="html-chart chart">
                                <div className="chart-header">
                                    <div>HTML</div>
                                </div>
                                <div className="percentage"
                                     style={{
                                         background: `linear-gradient(to top, #82ada9 ${this.state.htmlCards.percentage}%, #fff
                                     ${(this.state.htmlCards.percentage || 1) + 10 }%)`
                                     }}>
                                    <div>{this.state.htmlCards.percentage + '%'}</div>
                                </div>
                                <div>
                                    <div id="container" className='charts'/>
                                </div>
                            </div>
                            {this.state.cssCards.percentage &&
                            <div className="css-chart chart">
                                <div className="chart-header">
                                    <div>CSS</div>
                                </div>
                                <div className="percentage"
                                     style={{
                                         background: `linear-gradient(to top, #82ada9 ${this.state.cssCards.percentage}%, #fff
                                     ${(this.state.cssCards.percentage || 1) + 10 }%)`
                                     }}>
                                    <div>{this.state.cssCards.percentage + '%'}</div>
                                </div>
                                <div>
                                    <div id="container2" className='charts'/>
                                </div>
                            </div>
                            }
                            {this.state.jsCards.percentage &&
                            <div className="js-chart chart">
                                <div className="chart-header">
                                    <div>JS</div>
                                </div>
                                <div className="percentage"
                                     style={{
                                         background: `linear-gradient(to top, #82ada9 ${this.state.jsCards.percentage}%, #fff
                                     ${(this.state.jsCards.percentage || 1) + 10 }%)`
                                     }}>
                                    <div>{this.state.jsCards.percentage + '%'}</div>
                                </div>
                                <div>
                                    <div id="container3" className='charts'/>
                                </div>
                            </div>
                            }
                        </div> :
                        <div className="interview-placeholder">Interview is empty</div>
                    }
                </div>
            )
        } else {
            return (<h2>...loading</h2>)
        }
    }

    public chartScriptMaker() {

    }
}


const mapStateToProps = (state: any, OwnProps: any) => ({
    ...state, ...OwnProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Statistic);