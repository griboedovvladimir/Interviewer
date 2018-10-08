import * as React from "react";
import {Component} from 'react';
import Menu from "../menu/Menu"
import MainTable from "../main-table/Main-table";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../login/actions";
import {connect} from "react-redux";
import MainModal from "../main-modal/Main-modal";
import {Redirect} from "react-router";
import * as CONSTANTS from "../../constants";
import {Route, Switch} from 'react-router-dom';
import Interview from "../interview/Interview";
import Statistic from "../statistic/Statistic";


class MainPage extends Component {
    public props: any;

    constructor(props: any) {
        super(props);
    }

    public render() {
        if (this.props.logged) {
            return (
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                    <Menu parent = {CONSTANTS.MENU_ITEM_MAIN}/>
                    <main className="mdl-layout__content">
                        <div className="page-content">
                            <Switch>
                                <Route path="/main/statistic/:id" component={Statistic} />
                                <Route path="/main/interview/:id" component={Interview} />
                                <Route path="/main/" component={MainTable} />
                            </Switch>
                        </div>
                    </main>
                    <MainModal/>
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


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);