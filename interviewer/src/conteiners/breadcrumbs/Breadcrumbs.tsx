import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../main/actions';
import {InterviewInterface} from "../../interfaces/interview.interface";
import bound from "../../decorators/bound";
import {Redirect} from "react-router";
import * as CONSTANTS from "../../constants";
import "./Breadcrumbs.css"

export class Breadcrumbs extends Component {
    public props: any;
    public interview: InterviewInterface;
    public refClassInterview = '';
    public refClassName = '';
    public state = {
        redirectToInterview: false,
        redirectToStatistic: false
    };


    constructor(props: any) {
        super(props);

        if (this.props.parent === CONSTANTS.BREADCRUMBS_PARENT_STATISTIC) {
            this.refClassInterview = CONSTANTS.BREADCRUMBS_ACTIVE_CLASS;
        } else if (this.props.parent === CONSTANTS.BREADCRUMBS_PARENT_INTERVIEW) {
            this.refClassName = CONSTANTS.BREADCRUMBS_ACTIVE_CLASS;
        }

        this.props.interview.forEach((el: InterviewInterface) => {
            if (el.interview_id.toString() === this.props.interviewID) {
                this.interview = el;
            }
        });
    }


    @bound
    public setRedirectToStatistic() {
        this.setState({
            redirectToInterview: false,
            redirectToStatistic: true
        })
    };

    @bound
    public setRedirectToInterview() {
        this.setState({
            redirectToInterview: true,
            redirectToStatistic: false
        })
    };

    public renderRedirectToStatistic(): any {
        if (this.state.redirectToStatistic && this.props.parent === CONSTANTS.BREADCRUMBS_PARENT_INTERVIEW) {
            return <Redirect to={CONSTANTS.MAIN_PAGE_STATISTIC + this.props.interviewID}/>
        }
    };

    public renderRedirectToInterview(): any {
        if (this.state.redirectToInterview && this.props.parent === CONSTANTS.BREADCRUMBS_PARENT_STATISTIC) {
            return <Redirect to={CONSTANTS.MAIN_PAGE_INTERVIEW + this.props.interviewID}/>
        }
    };


    public render() {
        return (
            <div className="breadcrumbs">
                {this.renderRedirectToStatistic()}
                {this.renderRedirectToInterview()}
                <span id="toInterview" className="mdl-chip" onClick={this.setRedirectToInterview}>
    <span className={'mdl-chip__text ' + this.refClassInterview}>Interview</span>
</span>
                <span id="toStatistic" className="mdl-chip" onClick={this.setRedirectToStatistic}>
                        <span className={'mdl-chip__text ' + this.refClassName}>{this.interview.name}</span>
</span>
                <span className="mdl-chip">
                        <span className="mdl-chip__text">{'D' + this.interview.level}</span>
</span>
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


export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);