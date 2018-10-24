import * as React from "react";
import {Component} from 'react';
import './Main-save-modal.css'

export class MainSaveModal extends Component {
    public props: any;
    public state: any;

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="modal modal-save-hidden">
                    <div className="mdc-component mdc-component__textfield">
                        <div className="mdc-component__section mdc-component__section--size-small">
                            <div className="modal-title">Choice action with report</div>
                            <div className="save-modal-wrapper">
                                <div><i className="material-icons">save</i><p>Save as</p></div>
                                <div><i className="material-icons">print</i><p>Print</p></div>
                                <div><i className="material-icons">email</i><p>Send to interviewee</p></div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

