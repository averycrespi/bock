import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import GroupContent from "./GroupContent";
import SeriesContent from "./SeriesContent";

import SearchField from "./shared/SearchField";
import LabelledList from "./shared/LabelledList";

import { fetchGroupDetails, fetchSeriesDetails } from "../../logic/api";

const isEmpty = (obj) => Object.keys(obj).length == 0;

/**
 * Renders a grid of content.
 *
 * @component
 */
const ContentGrid = (props) => {
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [groupDetails, setGroupDetails] = useState({});
  const [seriesDetails, setSeriesDetails] = useState({});

  const handleFilterChange = (query) => {
    console.debug("Filtered groups by query: " + query);
    setFilteredGroups(
      props.groups.filter((group) => RegExp(query, "i").test(group.label))
    );
  };

  const handleGroupClick = (group) => {
    console.debug("Clicked group: " + group.label);
    fetchGroupDetails(group.name)
      .then((details) => {
        setGroupDetails(details);
        setSeriesDetails({});
        console.debug(details);
      })
      .catch(console.error);
  };

  const handleSeriesClick = (series) => {
    console.debug("Clicked series: " + series.label);
    fetchSeriesDetails(series.name)
      .then((details) => {
        setSeriesDetails(details);
        console.debug(details);
      })
      .catch(console.error);
  };

  return (
    Object.keys(props.groups).length > 0 && (
      <Grid container>
        <Grid item xs={3}>
          <SearchField placeholder="Search" onChange={handleFilterChange} />
          {filteredGroups.length > 0 && (
            <LabelledList items={filteredGroups} onClick={handleGroupClick} />
          )}
        </Grid>
        <Grid item xs={3}>
          {!isEmpty(groupDetails) && (
            <GroupContent
              details={groupDetails}
              onSeriesClick={handleSeriesClick}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {!isEmpty(seriesDetails) && <SeriesContent details={seriesDetails} />}
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
