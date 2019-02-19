import * as React from "react";
import { Component } from 'react';
import './Administration-menu.css'
import { guid } from "../../helpers/guid";

export interface IAdminTabs {
    id: string,
    className: string,
    name: string
}

export class AdministrationMenu extends Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            tabs: [
                { id: "interviewee", className: "admin-menu-item admin-menu-active", name: "Interviewee" },
                { id: "interview", className: "admin-menu-item", name: "Interview" },
                { id: "questions", className: "admin-menu-item", name: "Questions" },
                { id: "subtopic", className: "admin-menu-item", name: "Subtopic" },
                { id: "upload", className: "admin-menu-item", name: "Upload questions" },
            ]
        }
    }


    public switchMenuItem = (e: React.MouseEvent<HTMLElement>) => {
        const defaultClass = "admin-menu-item";
        const target = e.target as HTMLElement;
        this.setState({
            ...this.state,
            tabs: this.state.tabs.map((tab: IAdminTabs) => {
                return target.id === tab.id
                    ? { id: tab.id, className: defaultClass + ' admin-menu-active', name: tab.name }
                    : { id: tab.id, className: defaultClass, name: tab.name }
            })
        });
        this.props.switcherCallback(target.id);
    };

    public render(): React.ReactNode {
        return (
            <div className="admin-menu">
                { this.state.tabs.map((tab: IAdminTabs) => <div id={ tab.id } key={ guid() } className={ tab.className }
                                                                onClick={ this.switchMenuItem }>{ tab.name }</div>) }
            </div>
        )
    }

}
