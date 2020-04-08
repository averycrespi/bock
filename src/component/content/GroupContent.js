import React from "react";
import PropTypes from "prop-types";

import DetailsCard from "./shared/DetailsCard";
import LabelledList from "./shared/LabelledList";

/**
 * Renders group content.
 *
 * @component
 */
const GroupContent = (props) => {
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

GroupContent.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    series: PropTypes.array,
  }).isRequired,
  onSeriesClick: PropTypes.func.isRequired,
};

export default GroupContent;
