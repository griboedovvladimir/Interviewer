import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../main/actions';
import bound from "../../decorators/bound";
import {StatisticModal} from "../../components/statistic-modal/Statistic-modal";
import './Statistic-hart.css';
import {APICallService} from "../../services/APICall.service";


export class StatisticChart extends Component {
    public props: any;
    public state = {
        redirectToInterview: false,
        particularQuestion:{}
    };

    constructor(props: any, public api:APICallService) {
        super(props);
        this.api = new APICallService();
    }

    @bound
    public eventHandler(e:any){
        if (e.target.tagName === 'tspan') {
            let text = e.target.innerHTML.split(' ');
            if (text[0] === 'question') {
                this.api.getQuestionById(this.props.chartdata.cards[(text[1] - 1)].question_id).then(res=>{
                    this.setState({...this.state, particularQuestion: res})
                })
            }
        }
        if(e.target.id === 'remove-modal'){
            this.setState({...this.state, particularQuestion: {}})
        }
    }

    @bound
    public componentWillUnmount(){
        document.getElementById('chart' + this.props.chartdata.topic)!
            .removeEventListener('click', this.eventHandler)
    }

    @bound
    public componentDidMount() {
        setTimeout(this.chartScriptMaker, 0);
        if(document.getElementById('chart' + this.props.chartdata.topic)){
            document.getElementById('chart' + this.props.chartdata.topic)!
            .addEventListener('click', this.eventHandler)
            }
    }

    @bound
    public chartScriptMaker() {
        let columns = this.props.chartdata.cards.reduce((cnt: string, el: any, i: any) => {
            return cnt + `['<a href=\\'\\'>${'question ' + (i + 1)}</a>', ${el.mark}],`
        }, '');

        let chart = `Highcharts.chart('${this.props.chartdata.topic.toLocaleUpperCase() + "container"}', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Correction of answer (%)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Mark: <b>{point.y:.1f} % from 100</b>'
        },
        series: [{
            name: 'Population',
            data: [
            ${columns}
            ],
            dataLabels: {
                enabled: false,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    }); `;

        let script = document.createElement('script');
        script.setAttribute("defer", "defer");
        script.id = 'chartScript';
        script.innerHTML = chart;
        document.body.appendChild(script);
    }

    public render() {
        return (
            <div className="html-chart chart" id={'chart' + this.props.chartdata.topic}>
                <div className="chart-header">
                    <div>{this.props.chartdata.topic.toLocaleUpperCase()}</div>
                </div>
                <div className="percentage"
                     style={{
                         background: `linear-gradient(to top, #82ada9 ${this.props.chartdata.percentage}%, #fff
                                     ${(this.props.chartdata.percentage || 1) + 10 }%)`
                     }}>
                    <div>{this.props.chartdata.percentage + '%'}</div>
                </div>
                <div>{this.state.particularQuestion[0] &&
                <div className="statistic-question">
                    <StatisticModal particularQuestion={this.state.particularQuestion}/>
                </div>
                }
                    <div id={this.props.chartdata.topic.toLocaleUpperCase() + "container"} className='charts'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(StatisticChart);