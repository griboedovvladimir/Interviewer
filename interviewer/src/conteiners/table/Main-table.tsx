import * as React from "react";
import {Component} from 'react';
import {MainTableRow} from "../main-table-row/Main-table-row";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../login/actions";
import {connect} from "react-redux";


class MainTable extends Component {
    public props: any;

    constructor(props: any) {
        super(props);
    }

    public render() {
        let rows = this.props.interview.map((el: any, i: any) => {
            return <MainTableRow key={i}/>;
        });
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
                        {rows}
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

const mapStateToProps = (state: any) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MainTable);