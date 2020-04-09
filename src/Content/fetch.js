import { BASE_URL, fetchData, flattenNames, compareLabels } from "../utils";
import { GROUP_DETAILS_SCHEMA, OBSERVATIONS_SCHEMA } from "./schema";

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

const flattenDates = (observations, seriesName) =>
  observations.map((o) => ({
    date: o.d,
    value: Number(o[seriesName].v),
  }));

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
