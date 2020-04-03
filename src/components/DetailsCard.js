import React from 'react';
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function DetailsCard(props) {
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

DetailsCard.propTypes = {
    details: PropTypes.shape({
        label: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string
    }).isRequired,
};