import { BASE_URL, compareLabels, fetchData, flattenNames } from "./common";

const SCHEMA = {
  type: "object",
  properties: {
    groupDetails: {
      type: "object",
      properties: {
        name: { type: "string" },
        label: { type: "string" },
        description: { type: "string" },
        groupSeries: {
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
    },
  },
};

/**
 * Fetch group details from the API.
 *
 * Series will be returned in alphabetical order by label.
 *
 * @param {String} groupName Name of the group
 * @returns {Promise} Group details object
 * @throws Will throw an error if fetching, parsing, or validation fails
 */
export async function fetchGroupDetails(groupName) {
  console.debug("Fetching details for group: " + groupName + " ...");
  const url = BASE_URL + "/groups/" + groupName + "/json";
  return fetchData(url, SCHEMA, (data) => ({
    name: data.groupDetails.name,
    label: data.groupDetails.label,
    description: data.groupDetails.description,
    series: flattenNames(data.groupDetails.groupSeries).sort(compareLabels),
  }));
}
