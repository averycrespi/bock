import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

/**
 * Renders a table of observations.
 *
 * @component
 */
const ObservationTable = (props) => {
  const percentChange = (i) => {
    if (i == 0) {
      return "N/A";
    } else {
      const curr = props.observations[i].value;
      const prev = props.observations[i - 1].value;
      const change = (100 * ((curr - prev) / prev)).toFixed(2);
      if (change >= 0) {
        return "+" + change + "%";
      } else {
        return change + "%";
      }
    }
  };

  return (
    <div style={{ maxHeight: props.maxHeight, overflow: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.observations.map((o, i) => (
            <TableRow key={i}>
              <TableCell>{o.date}</TableCell>
              <TableCell align="right">{o.value}</TableCell>
              <TableCell align="right">{percentChange(i)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

ObservationTable.propTypes = {
  observations: PropTypes.arrayOf(
    PropTypes.shape({ date: PropTypes.string, value: PropTypes.number })
  ).isRequired,
  maxHeight: PropTypes.number.isRequired,
};

ObservationTable.defaultProps = {
  maxHeight: "50vh",
};

export default ObservationTable;
