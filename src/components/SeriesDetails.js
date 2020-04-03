import React from 'react';
import PropTypes from "prop-types";

export default function SeriesDetails(props) {
    if (Object.keys(props.details).length == 0) {
        return null;
    } else {
        return <div>TODO</div>;
    }
}

SeriesDetails.propTypes = {
    details: PropTypes.object.isRequired
};