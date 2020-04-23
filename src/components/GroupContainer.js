import DetailsCard from "./DetailsCard";
import LabelledList from "./LabelledList";
import PropTypes from "prop-types";
import React from "react";

const GroupContainer = ({ details, selectedIndex, onSeriesClick }) => {
  return (
    <div>
      <DetailsCard details={details} />
      <LabelledList
        items={details.series}
        selectedIndex={selectedIndex}
        onClick={onSeriesClick}
        maxHeight="50vh"
      />
    </div>
  );
};

GroupContainer.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    series: PropTypes.array,
  }).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onSeriesClick: PropTypes.func.isRequired,
};

export default GroupContainer;
