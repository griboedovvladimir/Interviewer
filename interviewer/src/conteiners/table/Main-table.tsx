import * as React from "react";
import {Component} from 'react';
import {MainTableRow} from "../main-table-row/Main-table-row";


export class MainTable extends Component {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
                        <div className="table-wrapper">
                            <div className="table-content">
                                <table className="mdl-data-table mdl-js-data-table persons-table">
                                    <thead>
                                    <tr>
                                        <th className="mdl-data-table__cell--non-numeric">Name</th>
                                        <th>Specialization</th>
                                        <th>Level</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <MainTableRow/>
                                    </tbody>
                                </table>
                                <div className="mdc-component mdc-component__buttons">
                                    <div className="mdc-component__containers__primary add-button">
                                        <button type="submit" className="mdc-button mdc-button--raised">Add new</button>
                                    </div>
                                </div>
                            </div>
                        </div>
        )
    }
}