import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";

const ObservationTable = ({ observations, maxHeight }) => {
  const percentChange = (i) => {
    if (i == 0) {
      return "N/A";
    } else {
      const curr = observations[i].value;
      const prev = observations[i - 1].value;
      const change = (100 * ((curr - prev) / prev)).toFixed(2);
      if (change >= 0) {
        return "+" + change + "%";
      } else {
        return change + "%";
      }
    }
  };

  return (
    <div style={{ maxHeight: maxHeight, overflow: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {observations.map((o, i) => (
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
  maxHeight: PropTypes.string,
};

ObservationTable.defaultProps = {
  maxHeight: "50vh",
};

export default ObservationTable;
