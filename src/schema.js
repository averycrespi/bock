// https://www.bankofcanada.ca/valet/lists/series/json
export const seriesListSchema = {
    "type": "object",
    "properties": {
        "series": {
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

// https://www.bankofcanada.ca/valet/series/${seriesName}/json
export const seriesDetailsSchema = {
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
}