import * as React from "react";
import {Component} from 'react';


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
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric">Don Aubrey</td>
                                        <td>Frontend developer</td>
                                        <td>1</td>
                                        <td>06.09.2018</td>
                                        <td>ok</td>
                                        <td>
                                            <i className="material-icons person-actions">visibility</i>
                                            <i className="material-icons person-actions">create</i>
                                            <i className="material-icons person-actions">delete</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric">Sophia Carson</td>
                                        <td>Frontend developer</td>
                                        <td>1</td>
                                        <td>06.09.2018</td>
                                        <td>ok</td>
                                        <td>
                                            <i className="material-icons person-actions">visibility</i>
                                            <i className="material-icons person-actions">create</i>
                                            <i className="material-icons person-actions">delete</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric">Steve Moreno</td>
                                        <td>Frontend developer</td>
                                        <td>1</td>
                                        <td>06.09.2018</td>
                                        <td>ok</td>
                                        <td>
                                            <i className="material-icons person-actions">visibility</i>
                                            <i className="material-icons person-actions">create</i>
                                            <i className="material-icons person-actions">delete</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric">John Doe</td>
                                        <td>Frontend developer</td>
                                        <td>1</td>
                                        <td>06.09.2018</td>
                                        <td>ok</td>
                                        <td>
                                            <i className="material-icons person-actions">visibility</i>
                                            <i className="material-icons person-actions">create</i>
                                            <i className="material-icons person-actions">delete</i>
                                        </td>
                                    </tr>
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