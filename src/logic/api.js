/** @module api */

import { Validator } from "jsonschema";

import {
  GROUPS_SCHEMA,
  GROUP_DETAILS_SCHEMA,
  OBSERVATIONS_SCHEMA,
} from "./schema";

const BASE_URL = "https://www.bankofcanada.ca/valet";

async function fetchData(url, schema, transform) {
  console.debug("Fetching data from url: " + url + " ...");
  const response = await fetch(url);
  const data = await response.json();
  const validator = new Validator();
  const result = validator.validate(data, schema);
  if (result.valid) {
    return transform(data);
  } else {
    throw result;
  }
}

// Flatten the names of groups or series.
// Converts from `{ name: { ...values } }` to `[ { name, ...values } ]`.
const flattenNames = (obj) =>
  Object.entries(obj).map(([k, v]) => ({ name: k, ...v }));

// Flatten the dates and values of observations.
// Converts `{ { d, name: v } }` to `[ { date, value } ]`.
const flattenDates = (observations, seriesName) =>
  observations.map((o) => ({
    date: o.d,
    value: Number(o[seriesName].v),
  }));

// Compare the labels of two groups or series.
const compareLabels = (a, b) => {
  if (a.label < b.label) {
    return -1;
  } else if (a.label > b.label) {
    return 1;
  } else {
    return 0;
  }
};

/**
 * Fetch groups from the API.
 *
 * Groups will be returned in alphabetical order by label.
 * Groups with empty labels will be removed.
 *
 * @method
 * @returns {Promise} Array of group objects
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchGroups() {
  console.debug("Fetching groups ...");
  const url = BASE_URL + "/lists/groups/json";
  return fetchData(url, GROUPS_SCHEMA, (data) =>
    flattenNames(data.groups)
      .sort(compareLabels)
      .filter((g) => g.label.trim())
  );
}

/**
 * Fetch group details from the API.
 *
 * Series will be returned in alphabetical order by label.
 *
 * @method
 * @param {String} groupName Name of the group
 * @returns {Promise} Group details object
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchGroupDetails(groupName) {
  console.debug("Fetching details for group: " + groupName + " ...");
  const url = BASE_URL + "/groups/" + groupName + "/json";
  return fetchData(url, GROUP_DETAILS_SCHEMA, (data) => ({
    name: data.groupDetails.name,
    label: data.groupDetails.label,
    description: data.groupDetails.description,
    series: flattenNames(data.groupDetails.groupSeries).sort(compareLabels),
  }));
}

/**
 * Fetch series details from the API.
 *
 * Observations will be returned in chronological order by date.
 *
 * @method
 * @param {String} seriesName Name of the series
 * @returns {Promise} Series details object with observations
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchSeriesDetails(seriesName) {
  console.debug("Fetching details for series: " + seriesName + " ...");
  const url = BASE_URL + "/observations/" + seriesName + "/json?recent=10";
  return fetchData(url, OBSERVATIONS_SCHEMA, (data) => ({
    name: seriesName,
    label: data.seriesDetail[seriesName].label,
    description: data.seriesDetail[seriesName].description,
    observations: flattenDates(data.observations, seriesName).reverse(),
  }));
}
