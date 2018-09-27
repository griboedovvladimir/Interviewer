import * as React from "react";
import {Component} from 'react';


export class MainTableRow extends Component {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
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
    )
    }
}