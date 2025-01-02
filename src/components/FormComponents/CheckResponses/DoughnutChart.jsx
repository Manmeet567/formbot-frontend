import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./CheckResponses.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ completeResponses, incompleteResponses }) => {

  const data = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        data: [completeResponses, incompleteResponses],
        backgroundColor: ["#3B82F6", "#909090"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  // Options for the chart
  const options = {
    cutout: "70%", // Defines the thickness of the doughnut
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div className="cr-doughnut-chart">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
