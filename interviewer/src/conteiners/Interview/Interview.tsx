import * as React from "react";
import {Component} from 'react';
// import {bindActionCreators, Dispatch} from 'redux';
// import {connect} from 'react-redux';
// import * as actions from './actions';
import {AuthorizationService} from "../../services/authorization.service";

export class Interview extends Component {
    public props: any;
    public authorization:AuthorizationService;

    constructor(props: any) {
        super(props);
        this.authorization = new AuthorizationService();
    }

    public render() {
       return ( <h1>Interview</h1>)
    }
}


// const mapStateToProps = (state: any) => ({
//     logged: state.login.logged,
// });
//
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     action: bindActionCreators({...actions}, dispatch)
// });
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(Interview);