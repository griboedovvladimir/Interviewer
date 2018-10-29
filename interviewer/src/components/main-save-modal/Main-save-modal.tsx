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
        sendButtonText:'Send to interviewee'
    };
    public api: APICallService;

    constructor(props: any) {
        super(props);
        this.api = new APICallService();
    }

    @bound
    public onPrint() {
        let printWindow = window.open();
        printWindow!.document.open('text/plain');
        printWindow!.document.write(`
        
    <style type="text/css">
        @page {
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            empty-cells: show
        }

        td, th {
            vertical-align: top;
            font-size: 10pt;
        }

        h1, h2, h3, h4, h5, h6 {
            clear: both;
        }

        ol, ul {
            margin: 0;
            padding: 0;
        }

        li {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        /* "li span.odfLiEnd" - IE 7 issue*/
        li span. {
            clear: both;
            line-height: 0;
            width: 0;
            height: 0;
            margin: 0;
            padding: 0;
        }

        span.footnodeNumber {
            padding-right: 1em;
        }

        span.annotation_style_by_filter {
            font-size: 95%;
            font-family: Arial;
            background-color: #fff000;
            margin: 0;
            border: 0;
            padding: 0;
        }

        span.heading_numbering {
            margin-right: 0.8rem;
        }

        * {
            margin: 0;
        }

        .ta1 {
            writing-mode: lr-tb;
        }

        .Default {
            font-family: Liberation Sans;
        }

        .ce1 {
            font-family: Liberation Sans;
            vertical-align: middle;
            text-align: center ! important;
            font-size: 14pt;
            font-weight: bold;
        }

        .ce10 {
            font-family: Liberation Sans;
            border-width: NaNcm;
            border-style: solid;
            border-color: #000000;
            vertical-align: middle;
            text-align: center ! important;
        }

        .ce11 {
            font-family: Liberation Sans;
            border-width: NaNcm;
            border-style: solid;
            border-color: #000000;
            vertical-align: middle;
            text-align: left ! important;
            margin-left: 0pt;
        }

        .ce12 {
            font-family: Liberation Sans;
            border-width: NaNcm;
            border-style: solid;
            border-color: #000000;
        }

        .ce13 {
            font-family: Liberation Sans;
            border-width: NaNcm;
            border-style: solid;
            border-color: #000000;
            vertical-align: middle;
            margin-left: 0pt;
        }

        .ce14 {
            font-family: Liberation Sans;
            text-align: left ! important;
            margin-left: 0pt;
        }

        .ce15 {
            font-family: Liberation Sans;
            font-weight: bold;
        }

        .ce2 {
            font-family: Liberation Sans;
            vertical-align: middle;
            text-align: left ! important;
            margin-left: 0pt;
        }

        .ce3 {
            font-family: Liberation Sans;
            vertical-align: middle;
            margin-left: 0pt;
        }

        .ce4 {
            font-family: Liberation Sans;
            vertical-align: middle;
            text-align: center ! important;
        }

        .ce5 {
            font-family: Liberation Sans;
            border-width: NaNcm;
            border-style: solid;
            border-color: #000000;
            vertical-align: middle;
            text-align: center ! important;
            margin-left: 0pt;
            font-weight: bold;
        }

        .ce6 {
            font-family: Liberation Sans;
            border-width: NaNcm;
            border-style: solid;
            border-color: #000000;
            vertical-align: middle;
            text-align: center ! important;
            font-weight: bold;
        }

        .ce7 {
            font-family: Liberation Sans;
            border-width: NaNcm;
            border-style: solid;
            border-color: #000000;
            text-align: center ! important;
            margin-left: 0pt;
        }

        .ce8 {
            font-family: Liberation Sans;
            vertical-align: middle;
            text-align: left ! important;
            margin-left: 0pt;
            font-weight: bold;
        }

        .ce9 {
            font-family: Liberation Sans;
            vertical-align: top;
            text-align: left ! important;
            margin-left: 0pt;
            font-size: 7pt;
            font-weight: bold;
        }

        .co1 {
            width: 17.74pt;
        }

        .co2 {
            width: 19.25pt;
        }

        .co3 {
            width: 70.21pt;
        }

        .co4 {
            width: 152.05pt;
        }

        .co5 {
            width: 64.01pt;
        }

        .co6 {
            width: 180.6pt;
        }

        .co7 {
            width: 154.35pt;
        }

        .ro1 {
            height: 34.5pt;
        }

        .ro2 {
            height: 12.81pt;
        }

        .ro3 {
            height: 23.24pt;
        }

        .ro4 {
            height: 15.76pt;
        }

        .ro5 {
            height: 18.74pt;
        }

        .ro6 {
            height: 21.74pt;
        }

        .ro7 {
            height: 14.26pt;
        }

        .T1 {
            font-weight: normal;
        }

        /* ODF styles with no properties representable as CSS */
        {
        }
    </style>
</head>
<body dir="ltr" style="max-width:841.69pt;">
<table border="0" cellspacing="0" cellpadding="0" class="ta1">
    <colgroup>
        <col width="27"/>
        <col width="30"/>
        <col width="108"/>
        <col width="234"/>
        <col width="99"/>
        <col width="278"/>
        <col width="238"/>
    </colgroup>
    <tr class="ro1">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="6" style="text-align:left;width:19.25pt; " class="ce1"><p>Interview № 15</p></td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="2" style="text-align:left;width:19.25pt; " class="ce2"><p>Date of interview:</p></td>
        <td style="text-align:left;width:152.05pt; " class="ce15"><p>16.09.2018</p></td>
        <td style="text-align:left;width:64.01pt; " class="Default"> </td>
        <td style="text-align:left;width:180.6pt; " class="Default"> </td>
        <td style="text-align:left;width:154.35pt; " class="Default"> </td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="2" style="text-align:left;width:19.25pt; " class="ce3"><p>Interviewee:</p></td>
        <td style="text-align:left;width:152.05pt; " class="ce15"><p>John Doe</p></td>
        <td style="text-align:left;width:64.01pt; " class="Default"> </td>
        <td style="text-align:left;width:180.6pt; " class="Default"> </td>
        <td style="text-align:left;width:154.35pt; " class="Default"> </td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="2" style="text-align:left;width:19.25pt; " class="ce2"><p>Specialization:</p></td>
        <td style="text-align:left;width:152.05pt; " class="ce15"><p>Frontend developer</p></td>
        <td style="text-align:left;width:64.01pt; " class="Default"> </td>
        <td style="text-align:left;width:180.6pt; " class="Default"> </td>
        <td style="text-align:left;width:154.35pt; " class="Default"> </td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="2" style="text-align:left;width:19.25pt; " class="ce2"><p>Qualification:</p></td>
        <td style="text-align:left;width:152.05pt; " class="ce15"><p>D2</p></td>
        <td style="text-align:left;width:64.01pt; " class="Default"> </td>
        <td style="text-align:left;width:180.6pt; " class="Default"> </td>
        <td style="text-align:left;width:154.35pt; " class="Default"> </td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="6" style="text-align:left;width:19.25pt; " class="ce4"> </td>
    </tr>
    <tr class="ro3">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td style="text-align:left;width:19.25pt; " class="ce5"><p>№</p></td>
        <td colspan="2" style="text-align:left;width:70.21pt; " class="ce5"><p>Question </p></td>
        <td style="text-align:left;width:64.01pt; " class="ce5"><p>Mark,%</p></td>
        <td style="text-align:left;width:180.6pt; " class="ce5"><p>Comment</p></td>
        <td style="text-align:left;width:154.35pt; " class="ce5"><p>Advise to exhaust</p></td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="6" style="text-align:left;width:19.25pt; " class="ce6"><p>CSS question block</p></td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td style="text-align:right; width:19.25pt; " class="ce7"><p>1</p></td>
        <td colspan="2" style="text-align:left;width:70.21pt; " class="ce11"><p>What are the CSS frameworks?</p></td>
        <td style="text-align:right; width:64.01pt; " class="ce7"><p>45</p></td>
        <td style="text-align:left;width:180.6pt; " class="ce12"><p>Some comment</p></td>
        <td style="text-align:left;width:154.35pt; " class="ce12"><p>Read more books</p></td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="6" style="text-align:left;width:19.25pt; " class="ce6"><p>HTML question block</p></td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td style="text-align:right; width:19.25pt; " class="ce7"><p>1</p></td>
        <td colspan="2" style="text-align:left;width:70.21pt; " class="ce13"><p>What is semantic HTML?</p></td>
        <td style="text-align:right; width:64.01pt; " class="ce7"><p>70</p></td>
        <td style="text-align:left;width:180.6pt; " class="ce12"> </td>
        <td style="text-align:left;width:154.35pt; " class="ce12"> </td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="6" style="text-align:left;width:19.25pt; " class="ce6"><p>JS question block</p></td>
    </tr>
    <tr class="ro2">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td style="text-align:right; width:19.25pt; " class="ce7"><p>1</p></td>
        <td colspan="2" style="text-align:left;width:70.21pt; " class="ce11"><p>How objects can be created?</p></td>
        <td style="text-align:right; width:64.01pt; " class="ce7"><p>80</p></td>
        <td style="text-align:left;width:180.6pt; " class="ce12"> </td>
        <td style="text-align:left;width:154.35pt; " class="ce12"> </td>
    </tr>
    <tr class="ro4">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="6" style="text-align:left;width:19.25pt; " class="ce4"> </td>
    </tr>
    <tr class="ro4">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="3" style="text-align:left;width:19.25pt; " class="ce8"><p>Total questions: <span
                class="T1">3</span></p></td>
        <td style="text-align:left;width:64.01pt; " class="Default"> </td>
        <td style="text-align:left;width:180.6pt; " class="Default"> </td>
        <td style="text-align:left;width:154.35pt; " class="Default"> </td>
    </tr>
    <tr class="ro5">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="3" style="text-align:left;width:19.25pt; " class="ce8"><p> </p>
            <p>Average mark(%): <span class="T1">65</span></p></td>
        <td style="text-align:left;width:64.01pt; " class="Default"> </td>
        <td style="text-align:left;width:180.6pt; " class="Default"> </td>
        <td style="text-align:left;width:154.35pt; " class="Default"> </td>
    </tr>
    <tr class="ro6">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td style="text-align:left;width:19.25pt; " class="ce8"> </td>
        <td style="text-align:left;width:70.21pt; " class="ce14"> </td>
        <td style="text-align:left;width:152.05pt; " class="ce14"> </td>
        <td style="text-align:left;width:64.01pt; " class="Default"> </td>
        <td style="text-align:left;width:180.6pt; " class="Default"> </td>
        <td style="text-align:left;width:154.35pt; " class="Default"> </td>
    </tr>
    <tr class="ro7">
        <td style="text-align:left;width:17.74pt; " class="Default"> </td>
        <td colspan="6" style="text-align:left;width:19.25pt; " class="ce9"><p>Made with Interviewer application</p>
        </td>
    </tr>
</table>
</body>
</html>
        
        
        `);
        printWindow!.document.close();
        printWindow!.focus();
        printWindow!.print();
    }

    @bound
    public sendByEmail() {
        this.setState({...this.state, sendButtonText:'Sending ...'});
        this.api.sendByEmail(this.props.row.interview_id).then(res=>{
            if(res){
                this.setState({...this.state, sendButtonText:'Send to interviewee'});
            }
        })
    }

    @bound
    public downloadExcel(){
        console.log("ok");
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
                            <div onClick={this.downloadExcel}><i className="material-icons">save</i><p>Save as excel file</p></div>
                            <div onClick={this.onPrint}><i className="material-icons">print</i><p>Print</p></div>
                            <div onClick={this.sendByEmail}><i className="material-icons">email</i><p>{this.state.sendButtonText}</p></div>
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

