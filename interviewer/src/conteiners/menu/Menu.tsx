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

class Menu extends Component {
    public props: any;
    public activateMainItem = '';
    public activateInterviewItem = '';
    public activateStatisticItem = '';
    public state = {
        redirect: false
    };

    constructor(props: any, private authorizationService: AuthorizationService) {
        super(props);
        this.activateMenuItem();
        this.authorizationService = new AuthorizationService();
    }

    public componentDidMount(){
        if (!document.getElementById('burger')) {
            let leftButton = document.createElement('div');
            leftButton.classList.add('mdl-layout__tab-bar-button');
            leftButton.classList.add('mdl-layout__tab-bar-left-button');
            let leftButtonIcon = document.createElement('i');
            leftButtonIcon.classList.add('material-icons');
            leftButtonIcon.id = 'burger';
            leftButtonIcon.textContent = 'dehaze';
            leftButton.appendChild(leftButtonIcon);
            document.body.appendChild(leftButton);
            leftButton.addEventListener('click', () => {
                let menu = document.getElementsByClassName('mdl-layout__drawer')[0];
                menu.classList.add('is-visible');
                let overlay = document.getElementsByClassName('mdl-layout__obfuscator')[0];
                overlay.classList.add('is-visible');
                overlay.addEventListener('click', ()=>{
                    overlay.classList.remove('is-visible');
                    menu.classList.remove('is-visible');
                })
            });
            window.addEventListener('resize', (event)=>{
                if(window.innerWidth>1025 && !document.getElementById('is-visible')){
                    let menu = document.getElementsByClassName('mdl-layout__drawer')[0];
                  menu.classList.remove('is-visible');
                    let overlay = document.getElementsByClassName('mdl-layout__obfuscator')[0];
                    overlay.classList.remove('is-visible');
                }
            })
        }
    }

    public componentWillUnmount(){
        if (document.getElementById('burger')) {
            document.getElementById('burger')!.remove();
        }
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

const mapStateToProps = (state: any, OwnProps: any) => OwnProps;

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);