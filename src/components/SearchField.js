import React, { useEffect } from "react";

import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

const SearchField = ({ placeholder, onChange }) => {
  let timeout = null;

  // Send an empty query when the component mounts.
  useEffect(() => onChange(""), []);

  const handleChange = (event) => {
    const query = event.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(query);
    }, 300);
  };

  return (
    <TextField
      placeholder={placeholder}
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
