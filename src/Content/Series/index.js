import React from "react";
import PropTypes from "prop-types";

import DetailsCard from "../DetailsCard";
import ObservationChart from "./ObservationChart";

/**
 * Renders series content.
 *
 * @component
 */
const Series = (props) => {
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

Series.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    observations: PropTypes.array,
  }).isRequired,
};

export default Series;
