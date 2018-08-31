import React, { Component } from 'react';
import $ from "jquery";
import { faTable, faChartArea, ZoomdataSDK, application, 
        credentials, source } from "../utils/constants";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Table from "./Table";


class BodyContainer extends Component {
    getClient = async () => {
        const client = await ZoomdataSDK.createClient({ application, credentials });
        return client;
    }

    barChart = (<div className="col-sm-6">
                        <BarChart zoomdataSource={source}
                            zoomdataClient={this.getClient} />
                    </div>)

    state = {
        pieSizeContainer: "col-sm-12",
        barChart: undefined,
        iconButton: faTable
    }

    componentDidMount = () => {
        $("#idSecondRow").slideUp();
    }

    handlePieSelected = async (e) => {
        this.setState(() => ({pieSizeContainer: "col-sm-12", barChart: undefined}));
        const pieSelected = Object.keys(e.selected).find((k) => e.selected[k] ===  true);
        if (pieSelected){
            const barChart = await (<BarChart zoomdataSource={source}
                                        zoomdataClient={this.getClient}  zoomdataFilter={pieSelected} />
                                )                           
            this.setState(() => ({pieSizeContainer: "col-sm-6", barChart: barChart}));
            $("#secondDivBar").show("slow");
        } else {
            $("#secondDivBar").slideUp();
        }
    }

    handleBtnShow = () => {
        if($("#idFirstRow").is(":hidden")){
            $("#idSecondRow").slideUp();
            $("#idFirstRow").show("slow");
            this.setState(() => ({iconButton: faTable}));
        } else {
            $("#idFirstRow").slideUp();
            $("#idSecondRow").show("slow");
            this.setState(() => ({iconButton: faChartArea}));
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div id="idFirstRow" className="row">
                    <div className={this.state.pieSizeContainer}>
                        <PieChart zoomdataClient={this.getClient} zoomdataSource={source} 
                        handlePieSelected={this.handlePieSelected}/>
                    </div>
                    <div id="secondDivBar" className="col-sm-6">
                        {this.state.barChart}
                    </div>
                </div>
                <div id="idSecondRow" className="row" hidden>
                    <div className="col-sm-12">
                        <Table zoomdataClient={this.getClient} zoomdataSource={source} />
                    </div>
                </div>
                <div className="footer"></div>
                <div className="fixed-div">
                    <button className="fixed-btn" onClick={this.handleBtnShow}>{this.state.iconButton}</button>
                </div>
            </div>
        );
    }
}

export default BodyContainer;