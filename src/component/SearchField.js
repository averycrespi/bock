import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

/**
 * Renders a search field.
 *
 * @component
 */
const SearchField = (props) => {
  let timeout = null;

  // Send an empty query when the component mounts.
  useEffect(() => props.onChange(""), []);

  const handleChange = (event) => {
    const query = event.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      props.onChange(query);
    }, 300);
  };

  return (
    <TextField
      placeholder={props.placeholder}
      fullWidth={true}
      onChange={handleChange}
    />
  );
};

SearchField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchField;
