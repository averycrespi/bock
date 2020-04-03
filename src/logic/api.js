import { Validator } from 'jsonschema';

import { GROUPS_SCHEMA, GROUP_DETAILS_SCHEMA, SERIES_DETAILS_SCHEMA, OBSERVATIONS_SCHEMA } from "./schema";

const GROUPS_URL = "https://www.bankofcanada.ca/valet/lists/groups/json";
const GROUP_DETAILS_URL = "https://www.bankofcanada.ca/valet/groups/GROUP_NAME/json";
const SERIES_DETAILS_URL = "https://www.bankofcanada.ca/valet/series/SERIES_NAME/json";
const OBSERVATIONS_URL = "https://www.bankofcanada.ca/valet/observations/SERIES_NAME/json?recent=10";

// Flatten `name: { ...values }` to `{name, ...values }`
const flatten = (obj) => Object.entries(obj).map(([k, v]) => ({ name: k, ...v }));

export const fetchGroups = (callback) => {
    console.log("Fetching groups ...");
    const validator = new Validator();
    fetch(GROUPS_URL)
        .then(response => response.json())
        .then((data) => {
            const result = validator.validate(data, GROUPS_SCHEMA);
            if (result.valid) {
                callback(flatten(data.groups));
            } else {
                console.error(result);
            }
        })
        .catch(console.error);
};

export const fetchGroupDetails = (groupName, callback) => {
    console.log("Fetching details for group: " + groupName + " ...");
    const validator = new Validator();
    fetch(GROUP_DETAILS_URL.replace("GROUP_NAME", groupName))
        .then(response => response.json())
        .then((data) => {
            const result = validator.validate(data, GROUP_DETAILS_SCHEMA);
            if (result.valid) {
                const details = {
                    name: data.groupDetails.name,
                    label: data.groupDetails.label,
                    description: data.groupDetails.description,
                    series: flatten(data.groupDetails.groupSeries)
                };
                callback(details);
            } else {
                console.error(result);
            }
        })
        .catch(console.error);
};

export const fetchSeriesDetails = (seriesName, callback) => {
    console.log("Fetching details for series: " + seriesName + " ...");
    const validator = new Validator();
    fetch(SERIES_DETAILS_URL.replace("SERIES_NAME", seriesName))
        .then(response => response.json())
        .then((data) => {
            const result = validator.validate(data, SERIES_DETAILS_SCHEMA);
            if (result.valid) {
                callback(data.seriesDetails);
            } else {
                console.error(result);
            }
        })
        .catch(console.error);
};

export const fetchObservations = (seriesName, callback) => {
    console.log("Fetching observations for series: " + seriesName + " ...");
    const validator = new Validator();
    fetch(OBSERVATIONS_URL.replace("SERIES_NAME", seriesName))
        .then(response => response.json())
        .then((data) => {
            const result = validator.validate(data, OBSERVATIONS_SCHEMA);
            if (result.valid) {
                // Convert `{ d, name: v }` to `{ date, value }` and sort in ascending order.
                const observations = data.observations.map(o => (
                    { date: o.d, value: Number(o[seriesName].v) }
                )).reverse();
                callback(observations);
            } else {
                console.error(result);
            }
        })
        .catch(console.error);
};