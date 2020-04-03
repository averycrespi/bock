import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import LabelledList from "./LabelledList";
import DetailsCard from "./DetailsCard";
import ObservationChart from "./ObservationChart";

import {
  fetchGroups,
  fetchGroupDetails,
  fetchSeriesDetails,
  fetchObservations,
} from "../logic/api";

import { PALETTE } from "../style/palette";

const theme = createMuiTheme({ palette: PALETTE });

export default function App() {
  const [groups, setGroups] = useState([]);
  const [groupDetails, setGroupDetails] = useState({});
  const [seriesDetails, setSeriesDetails] = useState({});
  const [observations, setObservations] = useState([]);

  // Load groups once when the component mounts.
  useEffect(() => fetchGroups(setGroups), []);

  const handleGroupClick = (group) => {
    console.log("Clicked group: " + group.label);
    fetchGroupDetails(group.name, setGroupDetails);
    // Clear series details and observations when a new group is clicked.
    setSeriesDetails({});
    setObservations([]);
  };

  const handleSeriesClick = (series) => {
    console.log("Clicked series: " + series.label);
    fetchSeriesDetails(series.name, setSeriesDetails);
    fetchObservations(series.name, setObservations);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={3}>
          <LabelledList items={groups} onClick={handleGroupClick} />
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
    </ThemeProvider>
  );
}
