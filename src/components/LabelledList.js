import React, { useState } from 'react';
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function LabelledList(props) {
    const [selectedIndex, setSelectedIndex] = useState();

    const handleClick = (event, index) => {
        props.onClick(props.elems[index]);
        setSelectedIndex(index);
    }

    return (
        <List style={{ maxHeight: "100vh", overflow: "auto" }}>
            {props.elems.map((elem, index) => {
                return (
                    <ListItem
                        button
                        key={index}
                        selected={index == selectedIndex}
                        onClick={(event) => handleClick(event, index)}
                    >
                        <ListItemText primary={elem.label} />
                    </ListItem>
                );
            })}
        </List>
    );
}

LabelledList.propTypes = {
    elems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func
};