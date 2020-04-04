/**
 * @module schema
 */

/**
 * Validates data from the groups API endpoint.
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

/**
 * Validates data from the group details API endpoint.
 */
export const GROUP_DETAILS_SCHEMA = {
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
 * Validates data from the series details API endpoint.
 */
export const SERIES_DETAILS_SCHEMA = {
  type: "object",
  properties: {
    seriesDetails: {
      type: "object",
      properties: {
        name: { type: "string" },
        label: { type: "string" },
        description: { type: "string" },
      },
    },
  },
};

/**
 * Validates data from the observations API endpoint.
 */
export const OBSERVATIONS_SCHEMA = {
  type: "object",
  properties: {
    observations: {
      type: "array",
      items: {
        type: "object",
      },
    },
  },
};
