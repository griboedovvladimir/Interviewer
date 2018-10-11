import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../main/actions";
import {connect} from "react-redux";
import {APICallService} from "../../services/APICall.service";
import {getDateByString} from "../../helpers/getDateByString";
import bound from '../../decorators/bound'
import * as CONSTANTS from '../../constants';


class MainModal extends Component {
    public props: any;

    constructor(props: any, private api: APICallService) {
        super(props);
        this.api = new APICallService();
    }

    @bound
    public handleSubmit(e: any) {
        e.preventDefault();
        let interview = {
            name: e.target.interviewName.value,
            specialization: e.target.specialization.value,
            level: e.target.level.value,
            date: getDateByString(),
            status: 'ok'
        };
        this.api.addInterview(interview).then(
            (newId: any) => {
                this.props.action.addInterview({
                    interview_id: newId,
                    ...interview
                });
                let el = document.getElementsByClassName(CONSTANTS.MODAL_ACTIVE)[0];
                let overlay = document.getElementById(CONSTANTS.MODAL_OVERLAY);
                if (overlay) {
                    overlay.remove();
                }
                el.classList.remove(CONSTANTS.MODAL_ACTIVE);
                el.classList.add(CONSTANTS.MODAL_HIDDEN);
            }
        );
        e.target.reset();
        e.target.specialization.value = "";
        e.target.level.value = "";
    }

    public render() {
        return (
            <div className="modal modal-hidden" >
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <div className="mdc-component mdc-component__textfield">

                        <div className="mdc-component__section mdc-component__section--size-narrow">
                            <div className="mdc-component__containers__primary mdc-textfield--theme-primary">
                                <div className="mdc-textfield">
                                    <input type="text" id="interviewName" name="interviewName"
                                           className="mdc-textfield__input"
                                           placeholder="Interviewee name" pattern="[^\s][A-zА-я. ]+[\s]?" minLength={3}
                                           required={true}/>
                                    <label htmlFor="interviewName"
                                           className="mdc-textfield__label mdc-textfield__label--float-above">Candidate
                                        name</label>
                                </div>
                            </div>

                            <div className="select">
                                <select id="specialization" name="specialization" className="select-text"
                                        required={true}>
                                    <option value="" disabled={true} selected={true}/>
                                    <option value="Frontend developer">Frontend developer</option>
                                    <option value="Frontend developer">Frontend developer</option>
                                    <option value="Frontend developer">Frontend developer</option>
                                </select>
                                <span className="select-highlight"/>
                                <span className="select-bar"/>
                                <label className="select-label">Select specialization*</label>
                            </div>

                            <div className="select">
                                <select id="level" name="level" className="select-text" required={true}>
                                    <option value="" disabled={true} selected={true}/>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <span className="select-highlight"/>
                                <span className="select-bar"/>
                                <label className="select-label">Select level*</label>
                            </div>


                            <div className="mdc-component mdc-component__buttons add-button">
                                <div className="mdc-component__containers__primary">
                                    <button type="submit" className="mdc-button mdc-button--raised">ADD</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MainModal);