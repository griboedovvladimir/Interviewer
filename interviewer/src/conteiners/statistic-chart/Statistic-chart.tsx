import * as React from "react";
import {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as actions from './../main-table/actions';
import bound from "../../decorators/bound";

export class StatisticChart extends Component{
    public props:any;
    public state:any;
    constructor(props:any) {
        super(props);
    }

    public componentDidMount() {
        setTimeout(this.chartScriptMaker, 0);
    }

    @bound
    public chartScriptMaker(){
        let chart =`Highcharts.chart('${this.props.chartdata.topic.toLocaleUpperCase()+"container"}', {
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
            pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
        },
        series: [{
            name: 'Population',
            data: [
                ['<a href=\\'https://tut.by\\'>question1</a>', 20],
                ['<a href=\\'https://tut.by\\'>question2</a>', 50],
                ['<a href=\\'https://tut.by\\'>question3</a>', 10],
                ['<a href=\\'https://tut.by\\'>question4</a>', 13.7],
                ['<a href=\\'https://tut.by\\'>question5</a>', 13.1],
                ['<a href=\\'https://tut.by\\'>question6</a>', 12.7],
                ['<a href=\\'https://tut.by\\'>question7</a>', 12.4],
                ['<a href=\\'https://tut.by\\'>question8</a>', 12.2],
                ['<a href=\\'https://tut.by\\'>question9</a>', 12.0],
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

    public render(){
        return(
            <div className="html-chart chart">
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
                <div>
                    <div id={this.props.chartdata.topic.toLocaleUpperCase()+"container"} className='charts'/>
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