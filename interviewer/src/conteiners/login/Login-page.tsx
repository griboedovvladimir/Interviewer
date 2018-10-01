import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {Redirect} from "react-router";
import {connect} from 'react-redux';
import * as CONSTANTS from '../../constants';
import * as actions from './actions';
import {CheckLoginService} from '../../services/check-login.service';
import {AuthorizationService} from "../../services/authorization.service";
import bound from '../../decorators/bound'


class LoginPage extends Component {
    public props: any;
    public authorization:AuthorizationService;

    constructor(props: any, private service: CheckLoginService) {
        super(props);
        this.service = new CheckLoginService;
        this.authorization = new AuthorizationService();
    }

    @bound public handleSubmit(e: any) {
        e.preventDefault();
        this.service.checkUser(e.target.loginName.value, e.target.loginPassword.value)
            .then(res => res.json().then(check => {
                if (check.authorization === CONSTANTS.LOGGED_API_RES) {
                    this.props.action.login(true);
                    this.authorization.authorizate(check.token);
                }
            }));
    }

    public render() {
        if (!this.props.logged) {
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
        } else {
            return <Redirect to={CONSTANTS.MAIN_PAGE}/>;
        }
    }
}


const mapStateToProps = (state: any) => ({
    logged: state.login.logged,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);