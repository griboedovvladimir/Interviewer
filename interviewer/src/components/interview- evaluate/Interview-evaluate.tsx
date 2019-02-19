import * as React from "react";
import { Component } from 'react';
import { bindActionCreators, Dispatch } from "redux";
import * as actions from "../interview/actions";
import { connect } from "react-redux";
import bound from "../../decorators/bound";
import { APICallService } from "../../services/APICall.service";
import "./Interview-evalute.css";
import * as CONSTANTS from './constants';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
    root: {
        width: '100%',
    },
    slider: {
        padding: '22px 0px',
        margin: '0 26px'
    },
};


class InterviewEvaluate extends Component <any, any> {
    public buttonText = CONSTANTS.BUTTON_TEXT_EVALUTE;
    public buttonClass = CONSTANTS.BUTTON_EDIT_CLASS;
    public snackbarClass = CONSTANTS.SNACKBAR_CLASS_HIDDEN;
    public material: any;
    public state = {
        value: 50,
    };


    constructor(props: any, private api: APICallService) {
        super(props);
        this.api = new APICallService();
    }

    public componentDidMount() {
    }

    public componentDidUpdate(prevProps: any) {
        let form = document.getElementById(CONSTANTS.FORM_ID) as HTMLFormElement;
        form.reset();
    }

    public componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        if (nextProps.dirty.mark !== this.props.dirty.mark) {
            this.setState({ ...this.state, value: this.props.dirty.mark });
        }
    }

    public handleChange = (event: any, value: number) => {
        this.setState({ value });
    };


    @bound
    public doEvaluate(e: any) {
        e.preventDefault();
        let questionCard = {
            questionId: this.props.question.question_id,
            interviewId: this.props.interviewID,
            topic: this.props.question.name,
            mark: e.target.slider ? e.target.slider.value : '',
            comment: e.target.comment ? e.target.comment.value : ''
        };
        this.api.getInterview();
        this.api.markIntervewAsCompleted(this.props.interviewID);
        if (!this.props.dirty.mark) {
            this.api.createQuestionCard(questionCard);
        } else {
            this.api.editQuestionCard({
                question_card_id: this.props.dirty.question_card_id,
                ...questionCard
            });
        }
        this.props.action.getDirtyQuestion({
            ...questionCard
        });
        this.api.getInterview().then(res => {
            this.props.action.getInterview(res);
        })
        this.snackbarClass = CONSTANTS.SNACKBAR_CLASS_ACTIVE;
        setTimeout(() => {
            this.snackbarClass = CONSTANTS.SNACKBAR_CLASS_HIDDEN;
            this.props.action.getDirtyQuestion({
                ...questionCard
            });
        }, 2000);
    }


    public render() {
        const { classes } = this.props;
        const { value } = this.state;

        if (this.props.dirty.mark) {
            this.buttonText = CONSTANTS.BUTTON_TEXT_EDIT;
            this.buttonClass = CONSTANTS.BUTTON_EDIT_CLASS;
        }
        if (!this.props.dirty.mark) {
            this.buttonText = CONSTANTS.BUTTON_TEXT_EVALUTE;
            this.buttonClass = CONSTANTS.BUTTON_EVALUTE_CLASS;
        }

        return (
            <form id="evaluteForm" onSubmit={ this.doEvaluate }>
                <div className="question-card-wide mdl-card mdl-shadow--2dp">
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
                        <div className={ classes.root }>
                            <Slider
                                classes={ { container: classes.slider } }
                                value={ value === undefined ? 0 : +value }
                                aria-labelledby="label"
                                onChange={ this.handleChange }
                            />
                        </div>
                        { this.props.dirty.mark &&
                        <textarea name="comment" className="card-textarea" defaultValue={ this.props.dirty.comment }
                                  placeholder="Comment"/>
                        }
                        { !this.props.dirty.mark &&
                        <textarea name="comment" className="card-textarea" placeholder="Comment"/>
                        }
                        <div className="mdc-component mdc-component__buttons">
                            <div className={ this.buttonClass }>
                                <button name="btn" type="submit" className="mdc-button mdc-button">{ this.buttonText }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={ this.snackbarClass }>
                        <div>Changes saved successfully</div>
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
    action: bindActionCreators({ ...actions }, dispatch)
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InterviewEvaluate));
