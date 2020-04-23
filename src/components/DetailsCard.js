import { Card, CardContent, Typography } from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";

const DetailsCard = ({ details }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{details.label}</Typography>
      <Typography variant="caption">{details.name}</Typography>
      <Typography variant="body1">{details.description}</Typography>
    </CardContent>
  </Card>
);

DetailsCard.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default DetailsCard;
