import * as React from "react";
import {Component} from 'react';
import {AuthorizationService} from "../../services/authorization.service";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../main-table/actions";
import {connect} from "react-redux";
import {APICallService} from "../../services/APICall.service";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import * as CONSTANTS from "../../constants";

class Interview extends Component {
    public props: any;
    public authorization: AuthorizationService;

    constructor(props: any, private api: APICallService) {
        super(props);
        this.authorization = new AuthorizationService();
        this.api = new APICallService();

        if (!this.props.interview[0]) {
            this.api.getInterview().then(res => {
                this.props.action.getInterview(res.reverse());
            });
        }
    }

    public render() {
        if (this.props.interview[0]) {
            return (
                <div className="page-content">
                    <Breadcrumbs interviewID={this.props.match.params.id}
                                 parent={CONSTANTS.BREADCRUMBS_PARENT_INTERVIEW}/>
                    <div className="current-question">
                        <div className="question-block">
                            <div>HTML</div>
                        </div>
                        <div className="question-count">
                            <div>question 1 from 999</div>
                        </div>
                    </div>

                    <div className="block-switcher">
                        <div id="CSSSwitcherBlock" className="block-switcher-items">
                            <div>CSS</div>
                        </div>
                        <div id="HTMLSwitcherBlock" className="block-switcher-items">
                            <div>HTML</div>
                        </div>
                        <div id="JSSwitcherBlock" className="block-switcher-items">
                            <div>JS</div>
                        </div>
                    </div>

                    <div className="question-slider">

                        <div className="card-wrapper">
                            <div className="question-card-wide mdl-card mdl-shadow--2dp">
                                <div className="card-content">
                                    <div className="material-icons card-arrow" aria-label="Add"><span
                                        className="mdc-fab__icon">keyboard_arrow_left</span>
                                    </div>
                                    <div>
                                        <div className="mdl-card__title">
                                            <h2 className="mdl-card__title-text">Question 1</h2>
                                        </div>
                                        <div className="mdl-card__supporting-text card-text">
                                            Why you would use a srcset attribute in an image tag? Explain the process
                                            the
                                            browser uses when evaluating the content of this attribute.
                                        </div>
                                    </div>
                                    <div className="material-icons card-arrow" aria-label="Add"><span
                                        className="mdc-fab__icon">keyboard_arrow_right</span>
                                    </div>
                                </div>
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