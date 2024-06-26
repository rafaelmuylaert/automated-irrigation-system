/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { useThemeUI } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineController, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

import { Line } from "react-chartjs-2";
import "./LineChart.css";
ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, Filler);
const linecolors = ["#05d690","#057fd6","#2705d6","#c405d6","#d6054b","#d65c05","#b3d605","#17d605"];
const bgcolors = ["#05d69010","#057fd610","#2705d610","#c405d610","#d6054b10","#d65c0510","#b3d60510","#17d60510"];
const LineChart = props => {
  const sensorName = props.sensorInFocus
  var requestIntervall = 60000 // 1 minute
  const capacityFactor = 100000
  const context = useThemeUI()
  const chartRef = React.createRef();
  const [dataFilter, setDataFilter] = useState("day");

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Irrigation',
      fill: true,
      data: [],
      borderWidth: 2,
      backgroundColor: 'rgba(4, 214, 144, 0.1)',
      borderColor: 'rgba(4, 214, 143, 1)',
    }]
  });
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
      duration: 300,
      easing: 'linear'
    },
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      y:{
          ticks: {
            fontColor: context.theme.colors.text,
            maxTicksLimit: 10,
            suggestedMin: 0,
            suggestedMax: 100
          },
          position: 'left',
        },
      y1:{
          ticks: {
            fontColor: context.theme.colors.text,
            maxTicksLimit: 10,
          },
          position: 'right',
        },
      x: {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: context.theme.colors.text,
          maxTicksLimit: 4,
          maxRotation: 0,
          minRotation: 0,
          callback: function (value) {
            if (dataFilter === "minute") return new Date(value).toLocaleTimeString('en', { second: 'numeric' }) + 's';
            if (dataFilter === "hour") return new Date(value).toLocaleTimeString('en', { minute: 'numeric' }) + 'min';
            if (dataFilter === "day") return new Date(value).toLocaleTimeString('en', { hour: 'numeric' });
            if (dataFilter === "week") return new Date(value).toLocaleDateString('en', { day: 'numeric', month: 'short' });
          },
        },
      },
    },
    legend: {
      display: true,
    },
    tooltips: {
      enabled: true,
    },
  };

  useEffect(() => {
    const loadData = () => {
      fetch(document.URL.replace(":5000", ":3000")+`measurements/${dataFilter}/${sensorName}`)
        .then(res => res.json())
        .then(
          async (liveData) => {
            const timestamps = liveData.map(data => data.timestamp)
            var lineChartData = {
              labels: timestamps,
              datasets: []
            };

            const omitkeys = ['timestamp','__v',"_id","sensorName"]
            var i=0;
            var firstline = liveData.find(() => true);
			Object.entries(firstline).forEach(([key, value]) => {
			  if(!omitkeys.includes(key)){
				var chartdata = liveData.map(data => data[key]);
				var yaxisid = 'y';
				if(Math.max(...chartdata) > 100){yaxisid = 'y1';}
				lineChartData.datasets.push(
				  {
					label: key,
					data: chartdata,
					yAxisID: yaxisid,
					backgroundColor: bgcolors[i % bgcolors.length],
					borderColor: linecolors[i++ % linecolors.length]
				  }
				)
			  }
			});
            setChartData(lineChartData)
          },
          (error) => {
            console.log(`Coudn't fetch data. Error: ${error}`)
          }
        )
    }

    loadData()
	if (dataFilter === "minute") {requestIntervall = 1000;}
    if (dataFilter === "hour") {requestIntervall = 60000;}
    if (dataFilter === "day") {requestIntervall = 3600000;}
    if (dataFilter === "week") {requestIntervall = 3600000;}
    const intervall = setInterval(() => {
      loadData()
    }, requestIntervall)

    return () => clearInterval(intervall);
  }, [setChartData, dataFilter, sensorName])

  const selectFilter = (filter) => {
    setDataFilter(filter)
  }

  return (
    <div className="line-chart">
      <select sx={{ color: "text" }} onChange={(e) => selectFilter(e.target.value)} className="chart-drop-down" value={dataFilter}>
        <option value="minute">Last Minute</option>
        <option value="hour">Last Hour</option>
        <option value="day">Last Day</option>
        <option value="week">Last Week</option>
      </select>
      {chartData.dataset ? <div /> : <Line ref={chartRef} data={chartData} options={options} />}
    </div>
  );
};

export default LineChart;
