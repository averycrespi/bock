import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import GroupContainer from "./GroupContainer";
import PropTypes from "prop-types";
import SearchContainer from "./SearchContainer";
import SeriesContainer from "./SeriesContainer";
import { fetchGroupDetails } from "../api/groupDetails";
import { fetchSeriesDetails } from "../api/seriesDetails";

const isEmpty = (obj) => Object.keys(obj).length == 0;

const ContentContainer = ({ groups }) => {
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [groupIndex, setGroupIndex] = useState(-1);
  const [groupDetails, setGroupDetails] = useState({});
  const [seriesIndex, setSeriesIndex] = useState(-1);
  const [seriesDetails, setSeriesDetails] = useState({});

  const handleFilterChange = (query) => {
    console.debug("Filtered groups by query: " + query);
    setGroupIndex(-1);
    setFilteredGroups(
      groups.filter((group) => RegExp(query, "i").test(group.label))
    );
  };

  const handleGroupClick = (group, index) => {
    console.debug("Clicked group: " + group.label);
    setGroupIndex(index);
    setSeriesIndex(-1);
    fetchGroupDetails(group.name)
      .then((details) => {
        setGroupDetails(details);
        setSeriesDetails({});
        console.debug(details);
      })
      .catch(console.error);
  };

  const handleSeriesClick = (series, index) => {
    console.debug("Clicked series: " + series.label);
    setSeriesIndex(index);
    fetchSeriesDetails(series.name)
      .then((details) => {
        setSeriesDetails(details);
        console.debug(details);
      })
      .catch(console.error);
  };

  return (
    Object.keys(groups).length > 0 && (
      <Grid container>
        <Grid item xs={3}>
          <SearchContainer
            filtered={filteredGroups}
            selectedIndex={groupIndex}
            onFilterChange={handleFilterChange}
            onGroupClick={handleGroupClick}
          />
        </Grid>
        <Grid item xs={3}>
          {!isEmpty(groupDetails) && (
            <GroupContainer
              details={groupDetails}
              selectedIndex={seriesIndex}
              onSeriesClick={handleSeriesClick}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {!isEmpty(seriesDetails) && (
            <SeriesContainer details={seriesDetails} />
          )}
        </Grid>
      </Grid>
    )
  );
};

ContentContainer.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default ContentContainer;
