import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import {AuthorizationService} from "../../services/authorization.service";
import {InterviewInterface} from "../../interfaces/interview.interface";

class Breadcrumbs extends Component {
    public props: any;
    public authorization: AuthorizationService;
    public interview: InterviewInterface;

    constructor(props: any) {
        super(props);
        this.authorization = new AuthorizationService();
        console.log(this.props);
        this.props.interview.forEach((el: InterviewInterface) =>{
            if(el.interview_id.toString() === this.props.interviewID){
                this.interview = el;
            }
        });
    }

    public render() {
        return (
            <div className="breadcrumbs">
<span className="mdl-chip">
    <span id="interview" className="mdl-chip__text chips">Interview</span>
</span>
                <span className="mdl-chip">
                        <span id="nameChip" className="mdl-chip__text">{this.interview.name}</span>
</span>
                <span className="mdl-chip">
                        <span id="levelChip" className="mdl-chip__text">{'D' + this.interview.level}</span>
</span>
            </div>
        )
    }
}


const mapStateToProps = (state: any, OwnProps:any) => ({
    ...state,...OwnProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);