import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

/**
 * Renders a text filter.
 *
 * @component
 */
const TextFilter = (props) => {
  let timeout = null;

  // Send an empty query when the component mounts.
  useEffect(() => props.onChange(""), []);

  const handleChange = (event) => {
    const query = event.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      props.onChange(query);
    }, 500);
  };

  return (
    <TextField placeholder="Query" fullWidth={true} onChange={handleChange} />
  );
};

TextFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TextFilter;
