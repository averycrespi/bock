import React from 'react';
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function LabelledList(props) {
    const handleClick = (event, index) => {
        props.onClick(props.elems[index]);
    }

    return (
        <List style={{ maxHeight: "100vh", overflow: "auto" }}>
            {props.elems.map((e, i) => {
                return (
                    <ListItem button key={i} onClick={(event) => handleClick(event, i)}>
                        <ListItemText primary={e.label} />
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