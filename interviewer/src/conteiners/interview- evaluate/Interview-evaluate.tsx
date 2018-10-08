import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../interview/actions";
import {connect} from "react-redux";
import bound from "../../decorators/bound";
import {APICallService} from "../../services/APICall.service";


class InterviewEvaluate extends Component {
    public props: any;
    public buttonText = 'evaluate';
    public buttonClass = "mdc-component__containers__secondary";

    constructor(props: any, private api: APICallService) {
        super(props);
        this.api = new APICallService();
    }

    @bound
    public doEvaluate(e: any) {
        e.preventDefault();
        this.api.createQuestionCard({
            questionId: this.props.question.question_id,
            interviewId: this.props.interviewID,
            topic: this.props.question.name,
            mark: e.target.slider.value,
            comment: e.target.comment.value
        })
    }

    public render() {
        if (this.props.dirtyQuestion) {
            this.buttonText = 'edit';
            this.buttonClass = "mdc-component__containers__secondary";
        }
        if (!this.props.dirtyQuestion) {
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
                    {this.props.dirtyQuestion &&
                    <div className="slider-line">
                        <input name="slider" className="mdl-slider mdl-js-slider" type="range"
                               min="0" max="100" defaultValue={this.props.dirtyQuestion.mark} tabIndex={0}/>
                    </div>
                    }
                    {!this.props.dirtyQuestion &&
                    <div className="slider-line">
                        <input name="slider" className="mdl-slider mdl-js-slider" type="range"
                               min="0" max="100" tabIndex={0}/>
                    </div>
                    }
                    {this.props.dirtyQuestion &&
                    <textarea name="comment" className="card-textarea" value={this.props.dirtyQuestion.comment} placeholder="Comment"/>
                    }
                    {!this.props.dirtyQuestion &&
                    <textarea name="comment" className="card-textarea" placeholder="Comment"/>
                    }
                    <div className="mdc-component mdc-component__buttons">
                        <div className={this.buttonClass}>
                            <button type="submit" className="mdc-button mdc-button">{this.buttonText}
                            </button>
                        </div>
                    </div>
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
