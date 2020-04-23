import { Validator } from "jsonschema";

export const BASE_URL = "https://www.bankofcanada.ca/valet";

/**
 * Fetch, validate, and transform data from a URL.
 *
 * @param {String} url URL to fetch data from
 * @param {Object} schema Schema to validate data with
 * @param {Function} transform Function to transform data with
 * @returns {Promise} Validated and transformed data
 * @throws Throws an error on failure
 */
export async function fetchData(url, schema, transform) {
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

/**
 * Flatten the names of groups or series.
 *
 * Converts from `{ name: { ...values } }` to `[ { name, ...values } ]`.
 *
 * @param {Object} obj Groups or series object
 * @returns {Array} Array of groups or series
 */
export const flattenNames = (obj) =>
  Object.entries(obj).map(([k, v]) => ({ name: k, ...v }));

/**
 * Compare the labels of two groups or series.
 *
 * @param {Object} a First group or series
 * @param {Object} b Second group or series
 * @returns {Number} -1 if a < b; 1 if a > b; 0 if a == b
 */
export const compareLabels = (a, b) => {
  if (a.label < b.label) {
    return -1;
  } else if (a.label > b.label) {
    return 1;
  } else {
    return 0;
  }
};
