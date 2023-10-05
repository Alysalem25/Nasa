/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class Diagram extends Component {	
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Stock Price of BMW - March 2018"
			},
			axisX:{
				valueFormatString: "DD MMM",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY: {
				title: "Closing Price (in EUR)",
				valueFormatString: "TN0.00",
				crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function(e) {
						return "TN" + CanvasJS.formatNumber(0 , "0.00");
					}
				}
			},
			// ...
// ...
// ...

data: [{
    type: "area",
    xValueFormatString: "MMM YYYY", // Use "MMM YYYY" format for month and year
    yValueFormatString: "th0.00",
    dataPoints: [
      { x: new Date("1950-01-01"), y: 5 }, // Start from the year 2000
      { x: new Date("1960-01-01"), y: 10 }, // Add a data point for the year 2010 or your desired starting point
      { x: new Date("1970-01-01"), y: 20 }, // Add a data point for the year 2020 or your desired starting point
      { x: new Date("1980-03-01"), y: 30 },
      { x: new Date("1990-03-01"), y: 40 },
      { x: new Date("2005-03-01"), y: 50 },
      { x: new Date("2010-03-01"), y: 45 },
      { x: new Date("2015-03-01"), y: 60 },
      { x: new Date("2020-03-01"), y: 76 },
      { x: new Date("2025-03-01"), y: 89  },
      // Add more data points for other years, incrementing by 10 years
    ]
  }]

// ...


  
  // ...
  
  
  // ...
  
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Diagram;

