import * as React from "react";
import {Component} from 'react';
import bound from "../../decorators/bound";


export class InterviewBlockSwitcher extends Component {
    public currentBlock='HTML';
    public state:any;
    constructor(props: any) {
        super(props);
    }

    @bound
    public switchBlock(e:any){


if((e.target.id || e.target.parentNode.id) === "CSSSwitcherBlock"){
    this.currentBlock = 'CSS'
}
else if((e.target.id || e.target.parentNode.id) === "HTMLSwitcherBlock"){
    this.currentBlock = 'HTML'
}
else if((e.target.id || e.target.parentNode.id) === "JSSwitcherBlock"){
    this.currentBlock = 'JS';
}
        this.setState({...this.state})
    }

    public render() {
        return (
            <div>
                <div className="current-question">
                    <div className="question-block">
                        <div>{this.currentBlock}</div>
                    </div>
                    <div className="question-count">
                        <div>question 1 from 999</div>
                    </div>
                </div>
                <div className="block-switcher">
                    <div onClick={this.switchBlock} id="CSSSwitcherBlock" className="block-switcher-items">
                        <div>CSS</div>
                    </div>
                    <div onClick={this.switchBlock} id="HTMLSwitcherBlock" className="block-switcher-items">
                        <div>HTML</div>
                    </div>
                    <div onClick={this.switchBlock} id="JSSwitcherBlock" className="block-switcher-items">
                        <div>JS</div>
                    </div>
                </div>
            </div>
        )
    }
}