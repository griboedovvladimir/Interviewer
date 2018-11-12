import * as React from "react";
import {Component} from 'react';
import bound from "../../decorators/bound";

export class AdministrationTableRow extends Component {
    public props: any;
    public state = {
        editButton: 'create'
    };

    constructor(props: any) {
        super(props);
    }

    @bound
    public onEdit() {
        this.setState({...this.state, editButton: this.state.editButton === 'create' ? 'save' : 'create'});
    }

    public render() {
        return (
            <tr>
                <td>{this.props.rowData.question_id}</td>
                <td>
                    {this.state.editButton === 'create' ? <div>{this.props.rowData.raiting}</div> :
                        <input type="number" defaultValue={this.props.rowData.raiting}/>
                    }
                </td>
                <td>
                    {this.state.editButton === 'create' ? <div>{this.props.rowData.subtopic_id}</div> :
                        <input type="number" defaultValue={this.props.rowData.subtopic_id}/>
                    }
                </td>
                <td className="mdl-data-table__cell--non-numeric">
                    {this.state.editButton === 'create' ? <div>{this.props.rowData.text}</div> :
                        <textarea defaultValue={this.props.rowData.text}/>
                    }
                </td>
                <td className="mdl-data-table__cell--non-numeric">
                    {this.state.editButton === 'create' ? <div>{this.props.rowData.source}</div> :
                        <textarea defaultValue={this.props.rowData.source}/>
                    }
                    </td>
                <td>
                    <a id="create" onClick={this.onEdit}><i
                        className="material-icons person-actions">{this.state.editButton}</i></a>
                    {/*<a id="save"><i className="material-icons person-actions">save</i></a>*/}
                    <a id="delete"><i className="material-icons person-actions">delete</i></a>
                </td>
            </tr>
        )
    }
}