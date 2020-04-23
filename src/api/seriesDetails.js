import { BASE_URL, fetchData } from "./common";

const SCHEMA = {
  type: "object",
  properties: {
    seriesDetail: {
      type: "object",
      patternProperties: {
        "^.*": {
          type: "object",
          properties: {
            label: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
    observations: {
      type: "array",
      items: {
        type: "object",
      },
    },
  },
};

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
 * @param {String} seriesName Name of the series
 * @returns {Promise} Series details object with observations
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchSeriesDetails(seriesName) {
  console.debug("Fetching details for series: " + seriesName + " ...");
  const url = BASE_URL + "/observations/" + seriesName + "/json?recent=10";
  return fetchData(url, SCHEMA, (data) => ({
    name: seriesName,
    label: data.seriesDetail[seriesName].label,
    description: data.seriesDetail[seriesName].description,
    observations: flattenDates(data.observations, seriesName).reverse(),
  }));
}
