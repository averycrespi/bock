/**
 * Validates data from the group details API endpoint.
 *
 * @constant
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
 * Validates data from the observations API endpoint, which includes series details.
 *
 * @constant
 */
export const OBSERVATIONS_SCHEMA = {
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
