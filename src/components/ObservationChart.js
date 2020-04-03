import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

export default function ObservationChart(props) {
  const chartData = {
    labels: props.observations.map((o) => o.date),
    datasets: [
      {
        label: props.details.description,
        data: props.observations.map((o) => o.value),
      },
    ],
  };

  if (Object.keys(props.observations).length == 0) {
    return null;
  } else {
    return <Line data={chartData} />;
  }
}

ObservationChart.propTypes = {
  details: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  observations: PropTypes.arrayOf(
    PropTypes.shape({ date: PropTypes.string, value: PropTypes.number })
  ).isRequired,
};
