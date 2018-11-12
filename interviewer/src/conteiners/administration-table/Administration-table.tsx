import * as React from "react";
import {Component} from 'react';
import {AdminAPICallService} from "../../services/AdminAPICall.service";
import {AdministrationTableRow} from "../administration-table-row/Administration-table-row";
import ReactPaginate from "react-paginate";
import bound from "../../decorators/bound";

export class AdministrationTable extends Component {
    public props: any;
    public state = {
        rows: [],
        selectedPage:0
    };
    public api: AdminAPICallService;

    constructor(props: any) {
        super(props);
        this.api = new AdminAPICallService();
        this.api.getAllQuestions().then(result => {
            this.setState({...this.state, rows: result})
        })
    }

    @bound
    public  handlePageClick(e:any){
        this.setState({...this.state,selectedPage:e.selected})
    }

    public render() {
        let rows = this.state.rows.map((el: any, i: any) => {
            if (this.state.selectedPage === 0) {
                if (i < 10) {
                    return <AdministrationTableRow key={el.question_id} rowData={el}/>;
                }
            }
            if (this.state.selectedPage > 0) {
                if (i > (this.state.selectedPage + 1) * 10 - 10 && i < (this.state.selectedPage + 1) * 10 + 10) {
                    return <AdministrationTableRow key={el.question_id} rowData={el}/>;
                }
            }
            return false;
        });
        return (
            <div>
                <div id = "react-paginate" >
                    <ReactPaginate previousLabel={"previous"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="">...</a>}
                                   breakClassName={"break-me"}
                                   pageCount={2}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination"}
                        // subContainerClassName={"pages pagination"}
                                   activeClassName={"active"} />
                </div>
            <table className="mdl-data-table mdl-js-data-table persons-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Subtopic</th>
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
            </div>
        )
    }
}