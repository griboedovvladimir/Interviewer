import * as React from "react";
import {Component} from 'react';
import {InterviewInterface} from "../../interfaces/interview.interface";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../main-table-row/actions";
import {connect} from "react-redux";
import {APICallService} from "../../services/APICall.service";
import bound from '../../decorators/bound'
import * as CONSTANTS from "../../constants";
import {Redirect} from 'react-router-dom'
import './Main-table-row.css'

export class MainTableRow extends Component {
    public props: any;
    public rowData: InterviewInterface;
    public state = {
        redirectToInterview: false,
        redirectToStatistic: false
    };

    constructor(props: any, private api: APICallService) {
        super(props);
        this.rowData = this.props.rowData;
        this.api = new APICallService();
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
        if (this.state.redirectToStatistic) {
            return <Redirect to={CONSTANTS.MAIN_PAGE_STATISTIC + this.rowData.interview_id}/>
        }
    };

    public renderRedirectToInterview(): any {
        if (this.state.redirectToInterview) {
            return <Redirect to={CONSTANTS.MAIN_PAGE_INTERVIEW + this.rowData.interview_id}/>
        }
    };


    @bound
    public removeRow() {
        this.props.action.removeInterview(this.rowData.interview_id);
        this.api.removeInterview(this.rowData.interview_id);
    }

    public render() {
        return (
            <tr>
                {this.renderRedirectToStatistic()}
                {this.renderRedirectToInterview()}
                <td className="mdl-data-table__cell--non-numeric">{this.rowData.name}</td>
                <td>{this.rowData.specialization}</td>
                <td>{this.rowData.level}</td>
                <td>{this.rowData.date}</td>
                <td>{this.rowData.status}</td>
                <td>
                    <a onClick={this.setRedirectToStatistic}><i className="material-icons person-actions">visibility</i></a>
                    <a onClick={this.setRedirectToInterview}><i className="material-icons person-actions">create</i></a>
                    <i className="material-icons person-actions" onClick={this.removeRow}>delete</i>
                </td>
            </tr>
        )
    }
}


const mapStateToProps = (state: any, ownProps: any) => ownProps;

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MainTableRow);