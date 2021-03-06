import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import React from "react";
import { useTheme } from "@material-ui/core/styles";

const ObservationChart = ({ details, observations }) => {
  const theme = useTheme();
  const chartData = {
    labels: observations.map((o) => o.date),
    datasets: [
      {
        label: details.description,
        data: observations.map((o) => o.value),
        borderColor: theme.palette.primary.main,
        backgroundColor: "#00000000", // Transparent
        lineTension: 0,
      },
    ],
  };
  return <Line data={chartData} />;
};

ObservationChart.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  observations: PropTypes.arrayOf(
    PropTypes.shape({ date: PropTypes.string, value: PropTypes.number })
  ).isRequired,
};

export default ObservationChart;
