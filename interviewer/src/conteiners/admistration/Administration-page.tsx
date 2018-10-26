import * as React from "react";
import {Component} from 'react';
import Menu from "../menu/Menu";
import * as CONSTANTS from "../../constants";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../login/actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {AdministrationTable} from "../administration-table/Administration-table";

export class AdministrationPage extends Component {
    public props: any;

    constructor(props: any) {
        super(props);
    }

    public render() {
        if (this.props.logged) {
            return (
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                    <Menu parent={CONSTANTS.MENU_ITEM_ADMINISTRATION}/>
                    <main className="mdl-layout__content">
                        <div className="page-content">
                    <AdministrationTable/>
                        </div>
                    </main>
                    <div className='mdl-layout__obfuscator'/>
                </div>
            )
        } else {
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