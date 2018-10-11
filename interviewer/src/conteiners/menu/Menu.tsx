import * as React from "react";
import {Component} from 'react';
import './Menu.css';
import bound from "../../decorators/bound";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../login/actions";
import {connect} from "react-redux";
import * as CONSTANTS from "../../constants";
import {Redirect} from 'react-router-dom';
import {AuthorizationService} from "../../services/authorization.service";
import  {MenuActivator} from "./menu-activator";

class Menu extends Component {
    public props: any;
    public activateMainItem = '';
    public activateInterviewItem = '';
    public activateStatisticItem = '';
    public state = {
        redirect: false
    };
    public menuActivator: MenuActivator;

    constructor(props: any,
                private authorizationService: AuthorizationService) {
        super(props);
        this.activateMenuItem();
        this.authorizationService = new AuthorizationService();
        this.menuActivator = new MenuActivator();

    }

    public componentDidMount(){
        this.menuActivator.activate()
    }

    public componentWillUnmount(){
        this.menuActivator.deactivate()
    }

    @bound
    public setRedirect() {
        this.setState({
            redirect: true
        })
    }

    public renderRedirect(): any {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
    }

    public activateMenuItem() {
        switch (this.props.parent) {
            case CONSTANTS.MENU_ITEM_MAIN:
                this.activateMainItem = CONSTANTS.MENU_ACTIVE_ITEM_CLASS;
                break;
            case CONSTANTS.MENU_ITEM_INTERVIEW:
                this.activateInterviewItem = CONSTANTS.MENU_ACTIVE_ITEM_CLASS;
                break;
            case CONSTANTS.MENU_ITEM_STATISTIC:
                this.activateStatisticItem = CONSTANTS.MENU_ACTIVE_ITEM_CLASS;
                break;
        }
    }

    @bound
    public logout() {
        this.authorizationService.logout();
        this.props.action.login(false);
    }

    public render() {
        return (
            <div className="mdl-layout__drawer">
                {this.renderRedirect()}
                <span className="mdl-layout-title menu-title">Interviewer</span>
                <nav className="mdl-navigation">
                    <a onClick={this.setRedirect} className={"mdl-navigation__link " + this.activateMainItem}>Main</a>
                    <a className={"mdl-navigation__link " + this.activateInterviewItem}>Interview</a>
                    <a className={"mdl-navigation__link " + this.activateStatisticItem}>Statistic</a>
                    <a className={"mdl-navigation__link "} onClick={this.logout}>Logout</a>
                </nav>
            </div>
        );
    }

}

const mapStateToProps = (state: any, OwnProps: any) => ({
    ...state, ...OwnProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);