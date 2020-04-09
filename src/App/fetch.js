import { BASE_URL, fetchData, flattenNames, compareLabels } from "../utils";
import { GROUPS_SCHEMA } from "./schema";

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
