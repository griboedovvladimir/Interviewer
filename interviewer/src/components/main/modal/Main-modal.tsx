import * as React from "react";
import {Component} from 'react';


export class MainModal extends Component {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (

            <div className="modal modal-hidden">
                <form className="login-form">
                    <div className="mdc-component mdc-component__textfield">

                        <div className="mdc-component__section mdc-component__section--size-narrow">
                            <div className="mdc-component__containers__primary mdc-textfield--theme-primary">
                                <div className="mdc-textfield">
                                    <input type="text" id="interviewName" className="mdc-textfield__input"
                                           placeholder="Interviewee name" pattern="[^\s][A-zА-я. ]+[\s]?" minLength={3}
                                           required={true}/>
                                        <label htmlFor="interviewName"
                                               className="mdc-textfield__label mdc-textfield__label--float-above">Candidate
                                            name</label>
                                </div>
                            </div>

                            <div className="select">
                                <select id="specialization" className="select-text" required={true}>
                                    <option value="" disabled={true} selected={true}/>
                                    <option value="Frontend developer">Frontend developer</option>
                                    <option value="Frontend developer">Frontend developer</option>
                                    <option value="Frontend developer">Frontend developer</option>
                                </select>
                                <span className="select-highlight"/>
                                <span className="select-bar"/>
                                <label className="select-label">Select specialization*</label>
                            </div>

                            <div className="select">
                                <select id="level" className="select-text" required={true}>
                                    <option value="" disabled={true} selected={true}/>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <span className="select-highlight"/>
                                <span className="select-bar"/>
                                <label className="select-label">Select level*</label>
                            </div>


                            <div className="mdc-component mdc-component__buttons add-button">
                                <div className="mdc-component__containers__primary">
                                    <button type="submit" className="mdc-button mdc-button--raised">ADD</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}