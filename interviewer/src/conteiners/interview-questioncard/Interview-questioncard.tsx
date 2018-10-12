import * as React from "react";
import {Component} from 'react';
import bound from "../../decorators/bound";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../main/actions";
import {connect} from "react-redux";
import * as CONSTANTS from "../../constants";
import './Interview-questiomcard.css'

class InterviewQuestioncard extends Component {
public props:any;

    constructor(props: any) {
        super(props);
    }

    @bound
    public getNextQuestion() {
this.props.updateData(CONSTANTS.QUESTION_NEXT);
    }

    @bound
    public getPrevQuestion() {
        this.props.updateData(CONSTANTS.QUESTION_PREV);
    }

    public render() {
        return (
            <div className="card-content">
                <div onClick={this.getPrevQuestion} className="material-icons card-arrow" aria-label="Add"><span
                    className="mdc-fab__icon">keyboard_arrow_left</span>
                </div>
                <div>
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">{'Question ' + (this.props.question.currentQuestionNumber)}</h2>
                    </div>
                    <div className="mdl-card__supporting-text card-text">
                        {this.props.question.text}
                    </div>
                </div>
                <div onClick={this.getNextQuestion} className="material-icons card-arrow" aria-label="Add"><span
                    className="mdc-fab__icon">keyboard_arrow_right</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any, OwnProps: any) => ({
    ...state, ...OwnProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(InterviewQuestioncard);