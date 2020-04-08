import React from "react";
import PropTypes from "prop-types";

import DetailsCard from "./shared/DetailsCard";
import ObservationChart from "./shared/ObservationChart";

/**
 * Renders series content.
 *
 * @component
 */
const SeriesContent = (props) => {
  return (
    <div>
      <DetailsCard details={props.details} />
      <ObservationChart
        details={props.details}
        observations={props.details.observations}
      />
    </div>
  );
};

SeriesContent.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    observations: PropTypes.array,
  }).isRequired,
};

export default SeriesContent;
