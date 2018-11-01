import * as React from "react";
import {Component} from 'react';

export class StatisticModal extends Component {
    public props:any;
    public state:any;
    constructor(props:any){
        super(props);
    }

    public render() {
        return (
            <div>
                <div className="remove">
                    <i id="remove-modal" className="material-icons">close</i>
                </div>
                <div>{this.props.particularQuestion[0].text}</div>
            </div>
        )
    }
}

