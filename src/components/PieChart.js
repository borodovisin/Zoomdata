import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { pieTitle, colorShowLoading, colorPallete } from "../utils/constants";


const containerTitle = "PIE CHART"

class PieChart extends Component {

    state = {
        queryConcept: "payment_type",
        queryLimit: 10,
        showLoading: true,
        loadingOption: {
            text: "",
            color: colorShowLoading,
            textColor: '#000',
            maskColor: 'rgba(255, 255, 255, 0.8)',
            zlevel: 0
        },
        option: {
            color: colorPallete,
            title: {
                text: pieTitle,
                left: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "Click me!<br/>{b}: {c} ({d}%)"
            },
            legend: {
                bottom: 0,
                left: 'center'
            },
            series : [
                {
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ],
        }
    }

    queryConfig = {
        groups: [
            {
            name: this.state.queryConcept,
            limit: this.state.queryLimit,
            sort: {
                name: 'volumen',
                dir: 'desc',
            },
            },
        ],
        metrics: [{ name: 'price', func: 'avg'}],
    }

    getConcept = (data) => {
        const dataArray = data.map((d) => ({name: d.group[0], value: d.current.count}));
        // Update data state
        this.setState(() => ({showLoading: false, option: {series:[{data:dataArray}]}}));
    }
    
    componentDidMount = async () => {
        const aggregatedQuery = async () => {
            try {
                // Get client conection to Zoomdata
                const client = await this.props.zoomdataClient();
                // create aggregated query
                const query = await client.createQuery(this.props.zoomdataSource, this.queryConfig);
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
          };
          
          aggregatedQuery();
    }

    onEvents = {
        'pieselectchanged': this.props.handlePieSelected
    }

    render() {
        return (
            <div className="chart-container">
                <div className="chart-container__title">{containerTitle}</div>
                <div className="chart-container__stage">
                    <ReactEcharts option={this.state.option} showLoading={this.state.showLoading} loadingOption={this.state.loadingOption}
                        onEvents={this.onEvents} style={{height: "70vh", width: '100%'}}  />
                </div>
            </div>
        );
    }
}

export default PieChart;