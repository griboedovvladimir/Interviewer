import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as actions from './../main/actions';
import {AuthorizationService} from "../../services/authorization.service";
import './Statistic.css'
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

class Statistic extends Component {
    public props: any;
    public authorization:AuthorizationService;

    constructor(props: any) {
        super(props);
        this.authorization = new AuthorizationService();
    }

    public render() {
        return (
            <div className="page-content">
<Breadcrumbs interviewID = {this.props.match.params.id}/>
                <div className="charts">
                    <div className="html-chart chart">
                        <div className="chart-header">
                            <div>HTML</div>
                        </div>
                        <div className="percentage per-html">
                            <div>92%</div>
                        </div>
                        <div>
                            <div id="container" className='charts'/>
                        </div>
                    </div>
                    <div className="css-chart chart">
                        <div className="chart-header">
                            <div>CSS</div>
                        </div>
                        <div className="percentage per-css">
                            <div>73%</div>
                        </div>
                        <div>
                            <div id="container2" className='charts'/>
                        </div>
                    </div>
                    <div className="js-chart chart">
                        <div className="chart-header">
                            <div>JS</div>
                        </div>
                        <div className="percentage per-js">
                            <div>86%</div>
                        </div>
                        <div>
                            <div id="container3" className='charts'/>
                        </div>
                    </div>
                </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Statistic);