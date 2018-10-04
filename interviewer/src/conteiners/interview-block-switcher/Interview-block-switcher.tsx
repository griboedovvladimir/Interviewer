import * as React from "react";
import {Component} from 'react';
import bound from "../../decorators/bound";
import * as CONSTANTS from './constants';
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../main-table/actions";
import {connect} from "react-redux";


class InterviewBlockSwitcher extends Component {
    public  props:any;
    public currentBlock = CONSTANTS.BLOCK_NAME_HTML;
    public state: any;
    public activeBlock = {
        css: '',
        html: CONSTANTS.BLOCK_ACTIVE_CLASS,
        js: ''
    };

    constructor(props: any) {
        super(props);
        this.props.updateData(this.currentBlock);
    }

    @bound
    public switchBlock(e: any) {
        for (let i of Object.keys(this.activeBlock)) {
            if (this.activeBlock[i] === CONSTANTS.BLOCK_ACTIVE_CLASS) {
                this.activeBlock[i] = '';
            }
        }
        if ((e.target.id || e.target.parentNode.id) === CONSTANTS.BLOCK_ID_CSS) {
            this.currentBlock = CONSTANTS.BLOCK_NAME_CSS;
            this.activeBlock.css = CONSTANTS.BLOCK_ACTIVE_CLASS;
        }
        else if ((e.target.id || e.target.parentNode.id) === CONSTANTS.BLOCK_ID_HTML) {
            this.currentBlock = CONSTANTS.BLOCK_NAME_HTML;
            this.activeBlock.html = CONSTANTS.BLOCK_ACTIVE_CLASS;
        }
        else if ((e.target.id || e.target.parentNode.id) === CONSTANTS.BLOCK_ID_JS) {
            this.currentBlock = CONSTANTS.BLOCK_NAME_JS;
            this.activeBlock.js = CONSTANTS.BLOCK_ACTIVE_CLASS;
        }
        this.setState({...this.state})
        this.props.updateData(this.currentBlock);
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
                    <div onClick={this.switchBlock} id="CSSSwitcherBlock"
                         className={"block-switcher-items " + this.activeBlock.css}>
                        <div>CSS</div>
                    </div>
                    <div onClick={this.switchBlock} id="HTMLSwitcherBlock"
                         className={"block-switcher-items " + this.activeBlock.html}>
                        <div>HTML</div>
                    </div>
                    <div onClick={this.switchBlock} id="JSSwitcherBlock"
                         className={"block-switcher-items " + this.activeBlock.js}>
                        <div>JS</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any, OwnProps: any) => ({
    ...state, ...OwnProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InterviewBlockSwitcher);
