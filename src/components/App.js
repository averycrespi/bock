import React, { useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";

import { fetchGroups, fetchGroupDetails, fetchSeriesDetails } from "../logic/api";
import LabelledList from "./LabelledList";
import Details from "./Details";

export default function App() {
    const [groups, setGroups] = useState([]);
    const [groupDetails, setGroupDetails] = useState({});
    const [seriesDetails, setSeriesDetails] = useState({});

    useEffect(() => fetchGroups(setGroups), []);

    const handleGroupClick = (group) => {
        console.log("Clicked group: " + group.label);
        fetchGroupDetails(group.name, setGroupDetails);
        setSeriesDetails({});
    };

    const handleSeriesClick = (series) => {
        console.log("Clicked series: " + series.label);
        fetchSeriesDetails(series.name, setSeriesDetails);
    }

    return (
        <Grid container>
            <Grid item xs={3}>
                <LabelledList items={groups} onClick={handleGroupClick} />
            </Grid>
            <Grid item xs={3}>
                <Details details={groupDetails} />
                <LabelledList items={groupDetails.series || []} onClick={handleSeriesClick} />
            </Grid>
            <Grid item xs={3}>
                <Details details={seriesDetails} />
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    );
}