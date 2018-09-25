import * as React from "react";
import {Component} from 'react';


export class Menu extends Component {


    constructor(props: any) {
        super(props);
    }

    public render() {
            return (
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title menu-title">Interviewer</span>
                    <nav className="mdl-navigation">
                        <a className="mdl-navigation__link" id="main">Main</a>
                        <a className="mdl-navigation__link" id="interview">Interview</a>
                        <a className="mdl-navigation__link" id="statistic">Statistic</a>
                        <a className="mdl-navigation__link" id="logout">Logout</a>
                    </nav>
                </div>
            );
    }
}