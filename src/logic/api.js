import { Validator } from 'jsonschema';

import { GROUP_SCHEMA, GROUP_DETAILS_SCHEMA, SERIES_DETAILS_SCHEMA } from "./schema";

const GROUP_URL = "https://www.bankofcanada.ca/valet/lists/groups/json";
const GROUP_DETAILS_URL = "https://www.bankofcanada.ca/valet/groups/GROUP_NAME/json";
const SERIES_DETAILS_URL = "https://www.bankofcanada.ca/valet/series/SERIES_NAME/json";

// Flatten `name: { label, link }` to `{name, label, link}`
const flatten = (obj) => Object.entries(obj).map(([k, v]) => ({ name: k, ...v }));

export const fetchGroups = (callback) => {
    const validator = new Validator();
    fetch(GROUP_URL)
        .then(response => response.json())
        .then((data) => {
            const result = validator.validate(data, GROUP_SCHEMA);
            if (result.valid) {
                callback(flatten(data.groups));
            } else {
                console.error(result);
            }
        })
        .catch(console.error);
};

export const fetchGroupDetails = (groupName, callback) => {
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