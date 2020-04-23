import DetailsCard from "./DetailsCard";
import ObservationChart from "./ObservationChart";
import PropTypes from "prop-types";
import React from "react";

const SeriesContainer = ({ details }) => (
  <div>
    <DetailsCard details={details} />
    <ObservationChart details={details} observations={details.observations} />
  </div>
);

SeriesContainer.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    observations: PropTypes.array,
  }).isRequired,
};

export default SeriesContainer;
