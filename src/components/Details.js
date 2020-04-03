import React from 'react';
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function Details(props) {
    if (Object.keys(props.details).length == 0) {
        return null;
    } else {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="h6">{props.details.label}</Typography>
                        <Typography variant="caption">{props.details.name}</Typography>
                        <Typography variant="body1">{props.details.description}</Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

Details.propTypes = {
    details: PropTypes.object.isRequired,
};