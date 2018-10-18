import * as React from "react";
import {Component} from 'react';
import MainTableRow from "../main-table-row/Main-table-row";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "./actions";
import {connect} from "react-redux";
import {APICallService} from "../../services/APICall.service";
import bound from '../../decorators/bound'
import * as CONSTANTS from '../../constants';
import './Main-table.css'

export class MainTable extends Component {
    public props: any;

    constructor(props: any, private api: APICallService) {
        super(props);
        this.api = new APICallService();
        this.api.getInterview().then(res => {
            this.props.action.getInterview(res);
        })
    }

    @bound
    public modalActivate() {
        if(!document.getElementById(CONSTANTS.MODAL_OVERLAY)) {
            let el = document.getElementsByClassName(CONSTANTS.MODAL_HIDDEN)[0];
            let overlay = document.createElement('div');
            overlay.id = CONSTANTS.MODAL_OVERLAY;
            document.body.appendChild(overlay);
            let removing = () => {
                overlay.removeEventListener('click', removing);
                overlay.remove();
                el.classList.remove(CONSTANTS.MODAL_ACTIVE);
                el.classList.add(CONSTANTS.MODAL_HIDDEN);
            };
            overlay.addEventListener('click', removing);
            el.classList.remove(CONSTANTS.MODAL_HIDDEN);
            el.classList.add(CONSTANTS.MODAL_ACTIVE);
        }
    }

    public render() {
        let rows = this.props.interview.map((el: any, i: any) => {
            return <MainTableRow key={el.interview_id} rowData={el}/>;
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
                        </tbody>
                    </table>
                    <div className="mdc-component mdc-component__buttons">
                        <div className="mdc-component__containers__primary add-button">
                            <button type="button" className="mdc-button mdc-button--raised"
                                    onClick={this.modalActivate}>Add new
                            </button>
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