import * as React from "react";
import {Component} from 'react';
import {AuthorizationService} from "../../services/authorization.service";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../main-table/actions";
import {connect} from "react-redux";
import {APICallService} from "../../services/APICall.service";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import InterviewBlockSwitcher from "../interview-block-switcher/Interview-block-switcher";
import * as CONSTANTS from "../../constants";
import * as SWITCHER_CONSTANTS from "../interview-block-switcher/constants";
import InterviewQuetioncard from "../interview-quetioncard/Interview-quetioncard";
import bound from "../../decorators/bound";

class Interview extends Component {
    public props: any;
    public authorization: AuthorizationService;
    public curentQuestionBlock = SWITCHER_CONSTANTS.BLOCK_NAME_HTML;

    constructor(props: any, private api: APICallService) {
        super(props);
        this.authorization = new AuthorizationService();
        this.api = new APICallService();

        if (!this.props.interview[0]) {
            this.api.getInterview().then(res => {
                this.props.action.getInterview(res.reverse());
            });
        }
// this.api.getQuestions(this.curentQuestionBlock).then(console.log)
    }

    @bound
    public getCurrentQuetionBlock(value: string) {
        this.curentQuestionBlock = value;
        this.setState({});
    }

    public render() {
        if (this.props.interview[0]) {
            return (
                <div className="page-content">
                    <Breadcrumbs interviewID={this.props.match.params.id}
                                 parent={CONSTANTS.BREADCRUMBS_PARENT_INTERVIEW}/>
                    <InterviewBlockSwitcher updateData={this.getCurrentQuetionBlock}/>
                    <div className="question-slider">
                        <div className="card-wrapper">
                            <div className="question-card-wide mdl-card mdl-shadow--2dp">
                                <InterviewQuetioncard interviewID={this.props.match.params.id}/>
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
                                               min="0" max="100" defaultValue="0" tabIndex={0}/>
                                    </div>
                                    <textarea className="card-textarea" placeholder="Comment"/>
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