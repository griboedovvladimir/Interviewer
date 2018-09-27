import * as React from "react";
import {Component} from 'react';
import {Menu} from "../menu/Menu"
import {MainTable} from "../table/Main-table";
import {MainModal} from "../modal/Main-modal";


export class MainPage extends Component {

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