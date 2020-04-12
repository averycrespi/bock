import React from "react";
import PropTypes from "prop-types";

import SearchField from "./SearchField";
import LabelledList from "../LabelledList";

/**
 * Renders Search content.
 *
 * @component
 */
const Search = (props) => {
  return (
    <div>
      <SearchField placeholder="Search" onChange={props.onFilterChange} />
      {props.filtered.length > 0 && (
        <LabelledList
          items={props.filtered}
          selectedIndex={props.selectedIndex}
          maxHeight="90vh"
          onClick={props.onGroupClick}
        />
      )}
    </div>
  );
};

Search.propTypes = {
  filtered: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onGroupClick: PropTypes.func.isRequired,
};

export default Search;
