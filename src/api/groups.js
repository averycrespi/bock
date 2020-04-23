import { BASE_URL, compareLabels, fetchData, flattenNames } from "./common";

const SCHEMA = {
  type: "object",
  properties: {
    groups: {
      type: "object",
      patternProperties: {
        "^.*": {
          type: "object",
          properties: {
            label: { type: "string" },
            link: { type: "string" },
          },
        },
      },
    },
  },
};

/**
 * Fetch groups from the API.
 *
 * Groups will be returned in alphabetical order by label.
 * Groups with empty labels will be removed.
 *
 * @returns {Promise} Array of group objects
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchGroups() {
  console.debug("Fetching groups ...");
  const url = BASE_URL + "/lists/groups/json";
  return fetchData(url, SCHEMA, (data) =>
    flattenNames(data.groups)
      .sort(compareLabels)
      .filter((g) => g.label.trim())
  );
}
