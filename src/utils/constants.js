import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const faTable = <FontAwesomeIcon icon="table" size="lg" />;
export const faChartArea = <FontAwesomeIcon icon="chart-area" size="lg" />;

// Zoomdata-client libarary
export const ZoomdataSDK = require("zoomdata-client");

// Application config for connect
export const application = {
    host: 'prototype.zoomdata.com',
    port: 443,
    path: '/zoomdata',
    secure: true,
  };

// Credentials for connect
export const credentials = {
      key: 'rFvfOtfzQV',
  };

  // Source data
export const source = {
    name: 'Sales (Dummy Data)',
};

//Pie Chart
export const pieTitle = "PAYMENT TYPE";
export const colorPallete = ["#97CD2D", "#4BB7C4", "#B0A8B9", "#486485" ];

//Bar Chart
export const barTitle = "COUNTRY FILTER BY:";
export const colorBar= ["#4BB7C4"];

//Loading color for graph
export const colorShowLoading = "#97CD2D";