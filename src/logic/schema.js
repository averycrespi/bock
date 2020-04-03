export const GROUPS_SCHEMA = {
    "type": "object",
    "properties": {
        "groups": {
            "type": "object",
            "patternProperties": {
                "^.*": {
                    "type": "object",
                    "properties": {
                        "label": { "type": "string" },
                        "link": { "type": "string" }
                    },
                }
            },
        }
    },
};

export const GROUP_DETAILS_SCHEMA = {
    "type": "object",
    "properties": {
        "groupDetails": {
            "type": "object",
            "properties": {
                "name": { "type": "string" },
                "label": { "type": "string" },
                "description": { "type": "string" },
                "groupSeries": {
                    "type": "object",
                    "patternProperties": {
                        "^.*": {
                            "type": "object",
                            "properties": {
                                "label": { "type": "string" },
                                "link": { "type": "string" }
                            },
                        }
                    },
                }
            }
        }
    }
};

export const SERIES_DETAILS_SCHEMA = {
    "type": "object",
    "properties": {
        "seriesDetails": {
            "type": "object",
            "properties": {
                "name": { "type": "string" },
                "label": { "type": "string" },
                "description": { "type": "string" }
            }
        }
    }
};


export const OBSERVATIONS_SCHEMA = {
    "type": "object",
    "properties": {
        "observations": {
            "type": "array",
            "items": {
                "type": "object"
            }
        }
    }
};