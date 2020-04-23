import { List, ListItem, ListItemText } from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";

const LabelledList = ({ items, selectedIndex, onClick, maxHeight }) => {
  const handleClick = (index) => {
    onClick(items[index], index);
  };

  return (
    <List style={{ maxHeight: maxHeight, overflow: "auto" }}>
      {items.map((item, index) => (
        <ListItem
          button
          key={index}
          selected={index == selectedIndex}
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
