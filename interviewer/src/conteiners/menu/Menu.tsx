import * as React from "react";
import {Component} from 'react';
import bound from "../../decorators/bound";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../login/actions";
import {connect} from "react-redux";

class Menu extends Component {
    public props:any;


    constructor(props: any) {
        super(props);
    }

    @bound public logout(){
        this.props.action.login(false);
    }

    public render() {
            return (
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title menu-title">Interviewer</span>
                    <nav className="mdl-navigation">
                        <a className="mdl-navigation__link" id="main">Main</a>
                        <a className="mdl-navigation__link" id="interview">Interview</a>
                        <a className="mdl-navigation__link" id="statistic">Statistic</a>
                        <a className="mdl-navigation__link" id="logout" onClick={this.logout}>Logout</a>
                    </nav>
                </div>
            );
    }

}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);