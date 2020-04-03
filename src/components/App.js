import React, { useState, useEffect } from 'react';
import { Validator } from 'jsonschema';

import TopBar from "./TopBar";
import { seriesListSchema } from "../schema.js";

export default function App() {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        var v = new Validator();
        fetch('https://www.bankofcanada.ca/valet/lists/series/json')
            .then(res => res.json())
            .then((data) => {
                const result = v.validate(data, seriesListSchema);
                if (result.valid) {
                    // Flatten seriesList object into array
                    setSeries(Object.entries(data.series).map(([k, v]) => ({ name: k, ...v })));
                } else {
                    console.error(result);
                }
            })
            .catch(console.error);
    }, []); // No dependencies => only runs once

    return (
        <div>
            <TopBar series={series} />
        </div>
    );
}