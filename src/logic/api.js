/** @module api */

import { Validator } from "jsonschema";

import {
  GROUPS_SCHEMA,
  GROUP_DETAILS_SCHEMA,
  OBSERVATIONS_SCHEMA,
} from "./schema";

const BASE_URL = "https://www.bankofcanada.ca/valet";

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

// Flatten `{ name: { ...values } }` to `[ { name, ...values } ]`.
const flattenGroups = (groups) =>
  Object.entries(groups).map(([k, v]) => ({ name: k, ...v }));

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
  return fetchData(url, GROUPS_SCHEMA, (data) => flattenGroups(data.groups));
}

// Flatten `{ name: { ...values } }` to `[ { name, ...values } ]`.
const flattenSeries = (series) =>
  Object.entries(series).map(([k, v]) => ({ name: k, ...v }));

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
    series: flattenSeries(data.groupDetails.groupSeries),
  }));
}

// Flatten `{ { d, name: v } }` to `[ { date, value } ]`.
const flattenObservations = (observations, seriesName) =>
  observations.map((o) => ({
    date: o.d,
    value: Number(o[seriesName].v),
  }));

/**
 * Fetch series details from the API.
 *
 * @method
 * @param {String} seriesName Name of the series
 * @returns {Promise} Series details object with observations
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchSeriesDetails(seriesName) {
  console.log("Fetching details for series: " + seriesName + " ...");
  const url = BASE_URL + "/observations/" + seriesName + "/json?recent=10";
  return fetchData(url, OBSERVATIONS_SCHEMA, (data) => ({
    name: seriesName,
    label: data.seriesDetail[seriesName].label,
    description: data.seriesDetail[seriesName].description,
    observations: flattenObservations(data.observations, seriesName).reverse(),
  }));
}
