import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../interview/actions";
import {connect} from "react-redux";
import bound from "../../decorators/bound";
import {APICallService} from "../../services/APICall.service";
import "./Interview-evalute.css";


class InterviewEvaluate extends Component {
    public props: any;
    public buttonText = 'evaluate';
    public buttonClass = "mdc-component__containers__secondary";
    public snackbarClass = 'snackbar-hidden';

    constructor(props: any, private api: APICallService) {
        super(props);
        this.api = new APICallService();
    }

    public componentDidUpdate(){

    }

    @bound
    public doEvaluate(e: any) {
        e.preventDefault();
        let interview = {
            questionId: this.props.question.question_id,
            interviewId: this.props.interviewID,
            topic: this.props.question.name,
            mark: e.target.slider.value,
            comment: e.target.comment.value
        };
        this.api.getInterview();
        if (!this.props.dirty.mark) {
            // this.api.createQuestionCard(interview);
            this.props.action.getDirtyQuestion({
                ...interview
            });
            this.snackbarClass = 'snackbar-active';
            setTimeout(()=>{
                this.snackbarClass= 'snackbar-hidden';
                this.props.action.getDirtyQuestion({
                    ...interview
                });
            },2000)
        }
        else {
            // this.api.editQuestionCard({
            //     question_card_id: this.props.dirtyQuestion.question_card_id,
            //     ...interview
            // });
            this.props.action.getDirtyQuestion({
                ...interview
            });
            this.snackbarClass = 'snackbar-active';
            setTimeout(()=>{
                this.snackbarClass= 'snackbar-hidden';
                this.props.action.getDirtyQuestion({
                    ...interview
                });
            },2000)
        }
    }

    public hide(){
        console.log("hide");
    }

    public render() {
        if (this.props.dirty.mark) {
            this.buttonText = 'edit';
            this.buttonClass = "mdc-component__containers__secondary";
        }
        if (!this.props.dirty.mark) {
            this.buttonText = 'evaluate';
            this.buttonClass = "mdc-component__containers__primary";
        }

        return (
            <form onSubmit={this.doEvaluate}>
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
                    {this.props.dirty.mark &&
                    <div className="slider-line">
                        <input id = "slider" name="slider" className="mdl-slider mdl-js-slider" type="range"
                               min="0" max="100" defaultValue={this.props.dirty.mark} tabIndex={0}/>
                    </div>
                    }
                    {!this.props.dirty.mark &&
                    <div className="slider-line">
                        <input id = "slider" name="slider" className="mdl-slider mdl-js-slider" type="range"
                               min="0" max="100" tabIndex={0}/>
                    </div>
                    }
                    {this.props.dirty.mark &&
                    <textarea name="comment" className="card-textarea" defaultValue={this.props.dirty.comment}
                              placeholder="Comment"/>
                    }
                    {!this.props.dirty.mark &&
                    <textarea name="comment" className="card-textarea" placeholder="Comment"/>
                    }
                    <div className="mdc-component mdc-component__buttons">
                        <div className={this.buttonClass}>
                            <button name="btn" type="submit" className="mdc-button mdc-button">{this.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={this.snackbarClass}>
                    <div>Changes saved successfully</div>
                </div>
            </form>

        )
    }
}

const mapStateToProps = (state: any, OwnProps: any) => ({
    ...state, ...OwnProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InterviewEvaluate);
