import React from "react";
import PropTypes from "prop-types";

import DetailsCard from "../DetailsCard";
import LabelledList from "../LabelledList";

/**
 * Renders group content.
 *
 * @component
 */
const Group = (props) => {
  return (
    <div>
      <DetailsCard details={props.details} />
      <LabelledList
        items={props.details.series}
        onClick={props.onSeriesClick}
        maxHeight="50vh"
      />
    </div>
  );
};

Group.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    series: PropTypes.array,
  }).isRequired,
  onSeriesClick: PropTypes.func.isRequired,
};

export default Group;
