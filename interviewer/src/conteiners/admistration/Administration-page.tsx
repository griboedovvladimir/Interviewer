import * as React from "react";
import {Component} from 'react';
import Menu from "../menu/Menu";
import * as CONSTANTS from "../../constants";

export class AdministrationPage extends Component {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                <Menu parent = {CONSTANTS.MENU_ITEM_ADMINISTRATION}/>
                <div className='mdl-layout__obfuscator'/>
            </div>
        )
    }
}