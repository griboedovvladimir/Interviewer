import * as React from "react";
import {Component} from 'react';
import {AdminAPICallService} from "../../services/AdminAPICall.service";
import {AdministrationTableRow} from "../administration-table-row/Administration-table-row";

export class AdministrationTable extends Component {
    public props: any;
    public state = {
        rows: []
    };
    public api: AdminAPICallService;

    constructor(props: any) {
        super(props);
        this.api = new AdminAPICallService();
        this.api.getAllQuestions().then(result => {
            this.setState({...this.state, rows: result})
        })
    }

    public render() {
        let rows = this.state.rows.map((el: any, i: any) => {
            if (this.props.selectedPage === 0) {
                if (i < 10) {
                    return <AdministrationTableRow key={el.question_id} rowData={el}/>;
                }
            }
            if (this.props.selectedPage > 0) {
                if (i > (this.props.selectedPage + 1) * 10 - 10 && i < (this.props.selectedPage + 1) * 10 + 10) {
                    return <AdministrationTableRow key={el.question_id} rowData={el}/>;
                }
            }
            return false;
        });
        return (
            <table className="mdl-data-table mdl-js-data-table persons-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Rating</th>
                    <th className="mdl-data-table__cell--non-numeric">Text</th>
                    <th className="mdl-data-table__cell--non-numeric">Source</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }
}