import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as actions from './../main-table/actions';
import './Statistic.css'
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {APICallService} from "../../services/APICall.service";
import * as CONSTANTS from'../../constants'
import {chart} from './chart';

class Statistic extends Component {
    public props: any;
    public state:any;

    constructor(props: any, private api:APICallService) {
        super(props);
        this.api = new APICallService();

        if(!this.props.interview[0]) {
            this.api.getInterview().then(res => {
                this.props.action.getInterview(res.reverse());
            });
        }
    }

    public componentDidMount(){
        setTimeout(chart,0);
    }

    public render() {
        if (this.props.interview[0]) {
            return (
                <div className="page-content">
                    <Breadcrumbs interviewID={this.props.match.params.id}
                                 parent={CONSTANTS.BREADCRUMBS_PARENT_STATISTIC}/>
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
        }else{
            return (<h2>...loading</h2>)
        }
    }
}


const mapStateToProps = (state: any, OwnProps:any) => ({
    ...state,...OwnProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    action: bindActionCreators({...actions}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Statistic);