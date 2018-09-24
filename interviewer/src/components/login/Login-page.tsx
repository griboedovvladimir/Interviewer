import * as React from "react";
import {Component} from 'react';
import {CheckLoginService} from '../../services/check-login.service';

export class LoginPage extends Component {

    constructor(props: any, private service: CheckLoginService) {
        super(props);
        this.service = new CheckLoginService;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit(e: any) {
        e.preventDefault();
        this.service.checkUser(e.target.loginName.value,e.target.loginPassword.value)
            .then(res=>res.text().then(console.log));
    }

    public render() {
        return (
            <div className="form-wrapper">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <div className="mdc-component mdc-component__textfield">
                        <div dir-horizontal="" className="mdc-component__containers">
                            <div className="mdc-component__section mdc-component__section--size-narrow">
                                <div className="mdc-component__containers__primary mdc-textfield--theme-primary">
                                    <div className="mdc-textfield">
                                        <input type="text" id="loginName" className="mdc-textfield__input"
                                               placeholder="Your name" name="loginName" pattern="[A-z.]+" required={true}
                                               minLength={3}/>
                                        <label htmlFor="loginName"
                                               className="mdc-textfield__label mdc-textfield__label--float-above">Name</label>
                                    </div>
                                </div>
                                <div className="mdc-component__containers__secondary mdc-textfield--theme-primary">
                                    <div className="mdc-textfield">
                                        <input type="password" id="loginPassword" className="mdc-textfield__input"
                                               name="loginPassword" placeholder="Your password" required={true}/>
                                        <label htmlFor="loginPassword"
                                               className="mdc-textfield__label mdc-textfield__label--float-above">Passsword</label>
                                    </div>
                                </div>
                                <div className="mdc-component mdc-component__buttons">
                                    <div className="mdc-component__containers__primary">
                                        <button type="submit" className="mdc-button mdc-button--raised">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}