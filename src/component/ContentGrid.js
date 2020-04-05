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
  const [groupSeries, setGroupSeries] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState({});
  const [observations, setObservations] = useState([]);

  const handleFilterChange = (query) => {
    console.log("Filtered groups by query: " + query);
    setFilteredGroups(
      props.groups.filter((group) => RegExp(query, "i").test(group.label))
    );
  };

  const handleGroupClick = (group) => {
    console.log("Clicked group: " + group.label);
    fetchGroupDetails(group.name)
      .then((details) => {
        setGroupDetails(details);
        setGroupSeries(details.series);
      })
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
          <TextFilter onChange={handleFilterChange} />
          {filteredGroups.length > 0 && (
            <LabelledList items={filteredGroups} onClick={handleGroupClick} />
          )}
        </Grid>
        <Grid item xs={3}>
          {Object.keys(groupDetails).length > 0 && (
            <DetailsCard details={groupDetails} />
          )}
          {groupSeries.length > 0 && (
            <LabelledList
              items={groupSeries}
              onClick={handleSeriesClick}
              maxHeight="50vh"
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {Object.keys(seriesDetails).length > 0 && (
            <div>
              <DetailsCard details={seriesDetails} />
              <ObservationChart
                details={seriesDetails}
                observations={observations}
              />
            </div>
          )}
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
