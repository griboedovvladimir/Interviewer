import * as React from "react";
import {Component} from 'react';
import './Main-save-modal.css'
import {APICallService} from "../../services/APICall.service";
import bound from "../../decorators/bound";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../conteiners/main-table-row/actions";
import {connect} from "react-redux";

export class MainSaveModal extends Component {
    public props: any;
    public state = {
        sendButtonText: 'Send to my email'
    };
    public api: APICallService;

    constructor(props: any) {
        super(props);
        this.api = new APICallService();
    }

    @bound
    public onPrint() {
        let printWindow = window.open();
        this.api.getPrint(this.props.row.interview_id).then(
            result => {
                printWindow!.document.open('text/plain');
                printWindow!.document.write(result);
                printWindow!.document.close();
                printWindow!.focus();
                printWindow!.print();
            }
        );
    }

    @bound
    public sendByEmail() {
        this.setState({...this.state, sendButtonText: 'Sending ...'});
        this.api.getUserEmail().then((user:any) => {
            this.api.sendByEmail(this.props.row.interview_id, user[0].email).then(res => {
                if (res) {
                    this.setState({...this.state, sendButtonText: 'Send to my email'});
                }
            })
        });
    }

    @bound
    public downloadExcel() {
        this.api.getExcel(this.props.row.interview_id).then(res => {
            const objectUrl: string = URL.createObjectURL(res);
            const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

            a.href = objectUrl;
            a.download = 'interviewer.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        });
    }

    public render() {
        return (
            <div className="modal modal-save-hidden">
                <div className="mdc-component mdc-component__textfield">
                    <div className="mdc-component__section mdc-component__section--size-small">
                        <div className="modal-title">Choice action with report</div>
                        <div className="save-modal-wrapper">
                            <div onClick={this.downloadExcel}><i className="material-icons">save</i><p>Save as excel
                                file</p></div>
                            <div onClick={this.onPrint}><i className="material-icons">print</i><p>Print</p></div>
                            <div onClick={this.sendByEmail}><i className="material-icons">email</i>
                                <p>{this.state.sendButtonText}</p></div>
                        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(MainSaveModal);

