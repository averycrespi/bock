import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

/**
 * Renders a list of labelled items.
 *
 * @component
 */
const LabelledList = (props) => {
  const handleClick = (index) => {
    props.onClick(props.items[index], index);
  };

  return (
    <List style={{ maxHeight: props.maxHeight, overflow: "auto" }}>
      {props.items.map((item, index) => (
        <ListItem
          button
          key={index}
          selected={index == props.selectedIndex}
          onClick={() => handleClick(index)}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
};

LabelledList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string }))
    .isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  maxHeight: PropTypes.string,
};

LabelledList.defaultProps = {
  maxHeight: "100vh",
};

export default LabelledList;
