import React from 'react';
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function ObservationList(props) {
    if (Object.keys(props.observations).length == 0) {
        return null;
    } else {
        return (
            <List style={{ maxHeight: "100vh", overflow: "auto" }}>
                {props.observations.map((obs, index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemText primary={obs.date} />
                            <ListItemText primary={obs.value} />
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}

ObservationList.propTypes = {
    observations: PropTypes.arrayOf(PropTypes.shape({ date: PropTypes.string, value: PropTypes.number })).isRequired
};