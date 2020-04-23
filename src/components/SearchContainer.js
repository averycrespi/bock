import LabelledList from "./LabelledList";
import PropTypes from "prop-types";
import React from "react";
import SearchField from "./SearchField";

const SearchContainer = ({
  filtered,
  selectedIndex,
  onFilterChange,
  onGroupClick,
}) => (
  <div>
    <SearchField placeholder="Search" onChange={onFilterChange} />
    {filtered.length > 0 && (
      <LabelledList
        items={filtered}
        selectedIndex={selectedIndex}
        maxHeight="90vh"
        onClick={onGroupClick}
      />
    )}
  </div>
);

SearchContainer.propTypes = {
  filtered: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onGroupClick: PropTypes.func.isRequired,
};

export default SearchContainer;
