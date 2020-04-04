/** @module api */

import { Validator } from "jsonschema";

import {
  GROUPS_SCHEMA,
  GROUP_DETAILS_SCHEMA,
  SERIES_DETAILS_SCHEMA,
  OBSERVATIONS_SCHEMA,
} from "./schema";

const BASE_URL = "https://www.bankofcanada.ca/valet";

const flatten = (obj) =>
  Object.entries(obj).map(([k, v]) => ({ name: k, ...v }));

async function fetchData(url, schema, transform) {
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

/**
 * Fetch groups from the API.
 *
 * @method
 * @returns {Promise} Array of group objects
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchGroups() {
  console.log("Fetching groups ...");
  const url = BASE_URL + "/lists/groups/json";
  return fetchData(url, GROUPS_SCHEMA, (data) => flatten(data.groups));
}

/**
 * Fetch group details from the API.
 * *
 * @method
 * @param {String} groupName Name of the group
 * @returns {Promise} Group details object
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchGroupDetails(groupName) {
  console.log("Fetching details for group: " + groupName + " ...");
  const url = BASE_URL + "/groups/" + groupName + "/json";
  return fetchData(url, GROUP_DETAILS_SCHEMA, (data) => ({
    name: data.groupDetails.name,
    label: data.groupDetails.label,
    description: data.groupDetails.description,
    series: flatten(data.groupDetails.groupSeries),
  }));
}

/**
 * Fetch series details from the API.
 *
 * @method
 * @param {String} seriesName Name of the series
 * @returns {Promise} Series details object
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchSeriesDetails(seriesName) {
  console.log("Fetching details for series: " + seriesName + " ...");
  const url = BASE_URL + "/series/" + seriesName + "/json";
  return fetchData(url, SERIES_DETAILS_SCHEMA, (data) => data.seriesDetails);
}

/**
 * Fetch observations from the API.
 *
 * @method
 * @param {String} seriesName Name of the series
 * @returns {Promise} Array of observation objects
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchObservations(seriesName) {
  console.log("Fetching observations for series: " + seriesName + " ...");
  const url = BASE_URL + "/observations/" + seriesName + "/json?recent=10";
  // Convert `{ d, name: v }` to `{ date, value }` and sort oldest-to-newest.
  return fetchData(url, OBSERVATIONS_SCHEMA, (data) =>
    data.observations
      .map((o) => ({
        date: o.d,
        value: Number(o[seriesName].v),
      }))
      .reverse()
  );
}
