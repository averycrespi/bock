import React from 'react';
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function GroupDetails(props) {
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

GroupDetails.propTypes = {
    details: PropTypes.object.isRequired,
};