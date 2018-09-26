import * as React from "react";
import {Component} from 'react';
import {connect} from 'react-redux'
import * as CONSTANTS from '../../constants'

 class LoginPage extends Component {
    public state: { logged: boolean };

    constructor(props: any) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit(e: any) {
        e.preventDefault();
        console.log(this.props);
this.props.onLogin('true');
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
                                               placeholder="Your name" name="loginName" pattern="[A-z.]+"
                                               required={true}
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
                                        <button type="submit" className="mdc-button mdc-button--raised">Submit
                                        </button>
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

export default connect(
    state => ({
        projects: state.login
    }),
    dispatch => ({
        onLogin: (logged:any) => {
            dispatch({type: CONSTANTS.LOGIN_PAGE,logged});
        }
    })
)(LoginPage);
