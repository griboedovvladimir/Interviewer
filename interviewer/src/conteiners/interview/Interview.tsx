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
import InterviewEvaluate from "../interview- evaluate/Interview-evaluate";

class Interview extends Component {
    public props: any;
    public authorization: AuthorizationService;
    public currentQuestionBlock = SWITCHER_CONSTANTS.BLOCK_NAME_HTML;
    public currentQuestionNumber = 1;
    public currentQuestion = this.props.question;
    public dirtyQuestion = '';

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
        // this.dirtyQuestion = '';
        this.api.getQuestions(this.currentQuestionBlock.toLocaleLowerCase(), currentQuestionNumber - 1)
            .then(question => {
                this.currentQuestion = {
                    ...this.currentQuestion, ...question
                };
                this.api.checkQuestionCard(this.currentQuestion.question_id, Number(this.props.match.params.id)).then(
                    res=>{
                        this.dirtyQuestion = res[0];
                    }
                );
                this.currentQuestion.currentQuestionNumber = this.currentQuestionNumber;
                this.props.action.getQuestion(this.currentQuestion);
            });
    }

    @bound
    public switchQuestion(value: string) {
        if (value === CONSTANTS.QUESTION_NEXT && this.currentQuestionNumber < this.currentQuestion.total) {
            this.currentQuestionNumber++;
            this.initQuestion(this.currentQuestionNumber);
        }
        else if (value === CONSTANTS.QUESTION_NEXT && this.currentQuestionNumber === this.currentQuestion.total) {
            this.currentQuestionNumber = 1;
            this.initQuestion(this.currentQuestionNumber);
        }
        if (value === CONSTANTS.QUESTION_PREV && this.currentQuestionNumber > 1) {
            this.currentQuestionNumber--;
            this.initQuestion(this.currentQuestionNumber);
        } else if (value === CONSTANTS.QUESTION_PREV && this.currentQuestionNumber === 1) {
            this.currentQuestionNumber = this.currentQuestion.total;
            this.initQuestion(this.currentQuestionNumber);
        }

    }

    @bound
    public getCurrentQuestionBlock(value: string) {
        this.currentQuestionBlock = value;
        this.currentQuestionNumber = 1;
        this.dirtyQuestion = '';
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
                                    <InterviewEvaluate dirtyQuestion={this.dirtyQuestion}
                                                       interviewID={this.props.match.params.id}/>
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