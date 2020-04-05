import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DetailsCard from "./DetailsCard";
import TextFilter from "./TextFilter";
import LabelledList from "./LabelledList";
import ObservationChart from "./ObservationChart";

import {
  fetchGroupDetails,
  fetchSeriesDetails,
  fetchObservations,
} from "../logic/api";

/**
 * Renders a grid of content.
 *
 * @component
 */
const ContentGrid = (props) => {
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [groupDetails, setGroupDetails] = useState({});
  const [seriesDetails, setSeriesDetails] = useState({});
  const [observations, setObservations] = useState([]);

  const handleGroupFilterChange = (query) => {
    setFilteredGroups(
      props.groups.filter((group) => RegExp(query, "i").test(group.label))
    );
    console.log("Filtered groups by query: " + query);
  };

  const handleGroupClick = (group) => {
    console.log("Clicked group: " + group.label);
    fetchGroupDetails(group.name)
      .then((details) => setGroupDetails(details))
      .catch(console.error);
    // Clear previous series details and observations.
    setSeriesDetails({});
    setObservations([]);
  };

  const handleSeriesClick = (series) => {
    console.log("Clicked series: " + series.label);
    fetchSeriesDetails(series.name)
      .then((details) => setSeriesDetails(details))
      .catch(console.error);
    fetchObservations(series.name)
      .then((observations) => setObservations(observations))
      .catch(console.error);
  };

  return (
    Object.keys(props.groups).length > 0 && (
      <Grid container>
        <Grid item xs={3}>
          <TextFilter onChange={handleGroupFilterChange} />
          <LabelledList items={filteredGroups} onClick={handleGroupClick} />
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
};

ContentGrid.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default ContentGrid;
