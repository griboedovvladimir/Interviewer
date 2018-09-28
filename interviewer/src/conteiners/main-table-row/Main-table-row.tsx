import * as React from "react";
import {Component} from 'react';
import {InterviewInterface} from "../../interfaces/interview.interface";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../main-table-row/actions";
import {connect} from "react-redux";

class MainTableRow extends Component {
    public props: any;
    public rowData: InterviewInterface;

    constructor(props: any) {
        super(props);
        this.rowData = this.props.rowData;
        this.removeRow = this.removeRow.bind(this);
    }

    public removeRow(){
 this.props.action.removeInterview(this.rowData.id);
    }

    public render() {
        return (
            <tr>
                <td className="mdl-data-table__cell--non-numeric">{this.rowData.name}</td>
        <td>{this.rowData.specialization}</td>
        <td>{this.rowData.level}</td>
        <td>{this.rowData.date}</td>
        <td>{this.rowData.status}</td>
        <td>
            <a href={'main/statistic/'+this.rowData.id}><i className="material-icons person-actions">visibility</i></a>
            <a href={'main/interview/'+this.rowData.id}><i className="material-icons person-actions">create</i></a>
            <i className="material-icons person-actions" onClick={this.removeRow}>delete</i>
        </td>
        </tr>
    )
    }
}


const mapStateToProps = (state: any, ownProps:any) =>  ownProps;

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MainTableRow);