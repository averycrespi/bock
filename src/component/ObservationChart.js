import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { useTheme } from "@material-ui/core/styles";

/**
 * Renders a chart of observations.
 *
 * If `observations` is empty, no chart is rendered.
 *
 * @component
 */
const ObservationChart = (props) => {
  const theme = useTheme();

  const chartData = {
    labels: props.observations.map((o) => o.date),
    datasets: [
      {
        label: props.details.description,
        data: props.observations.map((o) => o.value),
        borderColor: theme.palette.primary.main,
        backgroundColor: "#00000000", // Transparent
        lineTension: 0,
      },
    ],
  };

  return (
    Object.keys(props.observations).length > 0 && <Line data={chartData} />
  );
};

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

export default ObservationChart;
