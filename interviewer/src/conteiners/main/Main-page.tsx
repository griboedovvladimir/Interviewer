import * as React from "react";
import {Component} from 'react';
import {Menu} from "../menu/Menu"
import MainTable from "../table/Main-table";
import MainModal from "../modal/Main-modal";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../login/actions";
import {connect} from "react-redux";


 class MainPage extends Component {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                <Menu/>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <MainTable/>
                        <MainModal/>
                    </div>
                </main>
            </div>

        )
    }
}

const mapStateToProps = (state: any) => ({
    logged: state.login.logged,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);