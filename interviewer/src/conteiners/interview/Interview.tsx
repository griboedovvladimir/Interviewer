import * as React from "react";
import {Component} from 'react';
import {AuthorizationService} from "../../services/authorization.service";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "./actions";
import {connect} from "react-redux";
import './Interview.css';
import {APICallService} from "../../services/APICall.service";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import InterviewBlockSwitcher from "../interview-block-switcher/Interview-block-switcher";
import * as CONSTANTS from "../../constants";
import * as SWITCHER_CONSTANTS from "../interview-block-switcher/constants";
import InterviewQuetioncard from "../interview-questioncard/Interview-questioncard";
import bound from "../../decorators/bound";

class Interview extends Component {
    public props: any;
    public authorization: AuthorizationService;
    public currentQuestionBlock = SWITCHER_CONSTANTS.BLOCK_NAME_HTML;
    public currentQuestionNumber = 1;
    public currentQuestion = this.props.question;

    constructor(props: any, private api: APICallService) {
        super(props);
        this.authorization = new AuthorizationService();
        this.api = new APICallService();
        if (!this.props.interview[0]) {
            this.api.getInterview().then(res => {
                this.props.action.getInterview(res);
            });
            this.initQuestion(this.currentQuestionNumber);
        }
    }

    public initQuestion(currentQuestionNumber: number) {
        this.api.getQuestions(this.currentQuestionBlock.toLocaleLowerCase(), currentQuestionNumber - 1)
            .then(question => {
                this.currentQuestion = {
                    ...this.currentQuestion, ...question
                };
                this.currentQuestion.currentQuestionNumber = this.currentQuestionNumber;
                this.props.action.getQuestion(this.currentQuestion);
            });
    }

    @bound
    public switchQuestion(value: string) {
        if (value === 'next' && this.currentQuestionNumber < this.currentQuestion.total) {
            this.currentQuestionNumber++;
            this.initQuestion(this.currentQuestionNumber);
        }
        if (value === 'prev' && this.currentQuestionNumber > 1) {
            this.currentQuestionNumber--;
            this.initQuestion(this.currentQuestionNumber);
        }

    }

    @bound
    public getCurrentQuestionBlock(value: string) {
        this.currentQuestionBlock = value;
        this.currentQuestionNumber = 1;
        this.initQuestion(this.currentQuestionNumber);
    }

    public render() {
        if (this.props.interview[0]) {
            return (
                <div className="page-content">
                    <Breadcrumbs interviewID={this.props.match.params.id}
                                 parent={CONSTANTS.BREADCRUMBS_PARENT_INTERVIEW}/>
                    <InterviewBlockSwitcher total={this.currentQuestion.total}
                                            questionNumber={this.currentQuestionNumber}
                                            updateData={this.getCurrentQuestionBlock}/>
                    <div className="question-slider">
                        <div className="card-wrapper">
                            <div className="question-card-wide mdl-card mdl-shadow--2dp">
                                {this.props.question.text &&
                                <InterviewQuetioncard updateData={this.switchQuestion} question={this.props.question}
                                                      interviewID={this.props.match.params.id}/>
                                }
                                <div className="mdl-card__actions mdl-card--border">
                                    <div className="slider-titles">
                                        <div>FAILED</div>
                                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SO-SO</div>
                                        <div>ANSWERED</div>
                                    </div>
                                    <div className="slider-marks">
                                        <div className="slider-marks-circle"/>
                                        <div className="slider-marks-circle"/>
                                        <div className="slider-marks-circle"/>
                                    </div>
                                    <div className="slider-line">
                                        <input className="mdl-slider mdl-js-slider" type="range"
                                               min="0" max="100" tabIndex={0}/>
                                    </div>
                                    <textarea className="card-textarea" placeholder="Comment"/>
                                    <div className="mdc-component mdc-component__buttons">
                                        <div className="mdc-component__containers__primary">
                                            <button type="button" className="mdc-button mdc-button">evaluate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Interview);