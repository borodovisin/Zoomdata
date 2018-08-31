import React from "react";
import ReactDOM from "react-dom";
import ZoomdataDemo from "./components/ZoomdataDemo";
import "normalize.css/normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.scss";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartArea, faTable } from '@fortawesome/free-solid-svg-icons';

library.add(faChartArea, faTable);

ReactDOM.render(<ZoomdataDemo />, document.getElementById("app"));