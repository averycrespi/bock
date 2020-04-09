/**
 * Validates data from the groups API endpoint.
 *
 * @constant
 */
export const GROUPS_SCHEMA = {
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
