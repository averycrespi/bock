import React, { useState } from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function LabelledList(props) {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleClick = (event, index) => {
    props.onClick(props.items[index]);
    setSelectedIndex(index);
  };

  return (
    props.items.length > 0 && (
      <List style={{ maxHeight: props.maxHeight, overflow: "auto" }}>
        {props.items.map((item, index) => {
          return (
            <ListItem
              button
              key={index}
              selected={index == selectedIndex}
              onClick={(event) => handleClick(event, index)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    )
  );
}

LabelledList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string }))
    .isRequired,
  onClick: PropTypes.func,
  maxHeight: PropTypes.string,
};

LabelledList.defaultProps = {
  maxHeight: "100vh",
};
