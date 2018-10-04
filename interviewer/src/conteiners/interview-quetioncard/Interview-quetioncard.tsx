import * as React from "react";
import {Component} from 'react';
import bound from "../../decorators/bound";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../breadcrumbs/actions";
import {connect} from "react-redux";

class InterviewQuetioncard extends Component {


    constructor(props: any) {
        super(props);

    }

    @bound
    public getNextQuestion() {

    }

    @bound
    public getPrevQuestion() {

    }

    public render() {
        return (
            <div className="card-content">
                <div onClick={this.getPrevQuestion} className="material-icons card-arrow" aria-label="Add"><span
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


export default connect(mapStateToProps, mapDispatchToProps)(InterviewQuetioncard);