import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import LabelledList from "./LabelledList";
import DetailsCard from "./DetailsCard";
import ObservationChart from "./ObservationChart";

import {
  fetchGroupDetails,
  fetchSeriesDetails,
  fetchObservations,
} from "../logic/api";

export default function ContentGrid(props) {
  const [groupDetails, setGroupDetails] = useState({});
  const [seriesDetails, setSeriesDetails] = useState({});
  const [observations, setObservations] = useState([]);

  const handleGroupClick = (group) => {
    console.log("Clicked group: " + group.label);
    fetchGroupDetails(group.name, setGroupDetails);
    // Clear previous series details and observations.
    setSeriesDetails({});
    setObservations([]);
  };

  const handleSeriesClick = (series) => {
    console.log("Clicked series: " + series.label);
    fetchSeriesDetails(series.name, setSeriesDetails);
    fetchObservations(series.name, setObservations);
  };

  return (
    Object.keys(props.groups).length > 0 && (
      <Grid container>
        <Grid item xs={3}>
          <LabelledList items={props.groups} onClick={handleGroupClick} />
        </Grid>
        <Grid item xs={3}>
          <DetailsCard details={groupDetails} />
          <LabelledList
            items={groupDetails.series || []}
            onClick={handleSeriesClick}
            maxHeight="50vh"
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsCard details={seriesDetails} />
          <ObservationChart
            details={seriesDetails}
            observations={observations}
          />
        </Grid>
      </Grid>
    )
  );
}

ContentGrid.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};