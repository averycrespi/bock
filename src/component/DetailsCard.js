import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@material-ui/core";

/**
 * Renders a card with details.
 *
 * @component
 */
const DetailsCard = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{props.details.label}</Typography>
        <Typography variant="caption">{props.details.name}</Typography>
        <Typography variant="body1">{props.details.description}</Typography>
      </CardContent>
    </Card>
  );
};

DetailsCard.propTypes = {
  details: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default DetailsCard;
