import * as React from "react";
import {Component} from 'react';
import Menu from "../menu/Menu";
import * as CONSTANTS from "../../constants";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../login/actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {AdministrationTable} from "../administration-table/Administration-table";
import bound from "../../decorators/bound";
import {APICallService} from "../../services/APICall.service";
import './Administration-page.css';

import {AdministrationMenu} from "../administration-menu/Administration-menu";

export class AdministrationPage extends Component {
    public props: any;
    public state={
        isAdmin:false,
        currentPaginatePage:0
    };
    public api: APICallService;

    constructor(props: any) {
        super(props);
        this.api = new APICallService();
        if(this.props.logged) {
            this.checkRights();
        }
    }


    @bound
    public checkRights(){
        this.api.checkRights(localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY_AUTH_KEY)).then(res=>{
            this.setState({...this.state, isAdmin: res});
        });
    }
    @bound
    public switchedMenuItem(itemId:string){
        console.log(itemId)
    }


    public render() {
        if(this.props.logged) {
            return (
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                    <Menu parent={CONSTANTS.MENU_ITEM_ADMINISTRATION}/>

                        <main className="mdl-layout__content">
                            {this.state.isAdmin ?
                            <div className="page-content">
                                <AdministrationMenu switcherCallback = {this.switchedMenuItem}/>
                                <AdministrationTable/>
                            </div>: <h1 className="admin-placeholder">Your don't have rights for this page</h1>
                            }
                        </main>
                    <div className='mdl-layout__obfuscator'/>
                </div>
            )
        }
        else {
            return <Redirect to={CONSTANTS.LOGIN_PAGE}/>;
        }
    }
}

const mapStateToProps = (state: any) => ({
    logged: state.login.logged,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(AdministrationPage);