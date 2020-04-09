import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import Search from "./Search";
import Group from "./Group";
import Series from "./Series";

import { fetchGroupDetails, fetchSeriesDetails } from "./fetch";

const isEmpty = (obj) => Object.keys(obj).length == 0;

/**
 * Renders the application content.
 *
 * @component
 */
const Content = (props) => {
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
          <Search
            filtered={filteredGroups}
            onFilterChange={handleFilterChange}
            onGroupClick={handleGroupClick}
          />
        </Grid>
        <Grid item xs={3}>
          {!isEmpty(groupDetails) && (
            <Group details={groupDetails} onSeriesClick={handleSeriesClick} />
          )}
        </Grid>
        <Grid item xs={6}>
          {!isEmpty(seriesDetails) && <Series details={seriesDetails} />}
        </Grid>
      </Grid>
    )
  );
};

Content.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default Content;
