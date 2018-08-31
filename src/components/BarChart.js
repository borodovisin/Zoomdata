import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { barTitle, colorShowLoading, colorBar } from "../utils/constants";

const containerTitle = "Bar chart"

class BarChart extends Component {
    state = {
        showLoading: true,
        loadingOption: {
            text: "",
            color: colorShowLoading,
            textColor: '#000',
            maskColor: 'rgba(255, 255, 255, 0.8)',
            zlevel: 0
        },
        option: {
            color: colorBar,
            title: {
                text: `${barTitle} ${this.props.zoomdataFilter}`,
                left: 'center'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Count',
                    type:'bar',
                    barWidth: '60%',
                }
            ]
        },
        queryConfig: {
            filters: [
                {
                  path: { name: 'payment_type' },
                  operation: 'EQUALS',
                  value: this.props.zoomdataFilter,
                },
              ],
            groups: [
                {
                name: "country",
                limit: 20,
                sort: {
                    name: 'volumen',
                    dir: 'desc',
                },
                },
            ],
            metrics: [{ name: 'price', func: 'avg'}],
        }
    }

    getConcept = (data) => {
        const xAxis = data.map((d) => d.group[0]);
        const series = data.map((d) => d.current.count);
        // Update data state
        this.setState(() => ({showLoading: false, option: {xAxis: {data: xAxis}, series: [{data: series}]}}));
    }

    getZoomdataData = async () => {
        try {
            // Get client conection to Zoomdata
            const client = await this.props.zoomdataClient();
            // create aggregated query
            const query = await client.createQuery(this.props.zoomdataSource, this.state.queryConfig);
            client.runQuery(query, 
                data => {
                    this.getConcept(data);
                },
                error => {
                    console.error(error);
                },
            );
        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount = async () => {
        this.getZoomdataData();
    }

    render() {
        return (
            <div className="chart-container">
                <div className="chart-container__title">{containerTitle}</div>
                <div className="chart-container__stage">
                    <ReactEcharts option={this.state.option} showLoading={this.state.showLoading} loadingOption={this.state.loadingOption}
                        style={{height: "70vh", width: '100%'}}/>                
                </div>
            </div>
        );
    }
}

export default BarChart;