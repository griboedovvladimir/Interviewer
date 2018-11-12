import * as React from "react";
import {Component} from 'react';
import './Administration-menu.css'
import bound from "../../decorators/bound";

export class AdministrationMenu extends Component {
    public props: any;
    public state: any;

    constructor(props: any) {
        super(props)
    }

    @bound
    public switchMenuItem(e: any) {
        let items = document.getElementsByClassName('admin-menu-item');
        // @ts-ignore
        for (let i of items) {
            if (i.classList.contains('admin-menu-active')) {
                i.classList.remove('admin-menu-active');
            }
        }
        e.target.classList = 'admin-menu-item admin-menu-active';
        this.props.switcherCallback(e.target.id);
    }

    public render() {
        return (
            <div className="admin-menu">
                <div id="interviewee" className="admin-menu-item" onClick={this.switchMenuItem}>Interviewee</div>
                <div id="interview" className="admin-menu-item" onClick={this.switchMenuItem}>Interview</div>
                <div id="questions" className="admin-menu-item" onClick={this.switchMenuItem}>Questions</div>
                <div id="subtopic" className="admin-menu-item" onClick={this.switchMenuItem}>Subtopic</div>
                <div id="upload" className="admin-menu-item" onClick={this.switchMenuItem}>Upload questions</div>
            </div>
        )
    }

}