import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

/**
 * Renders an action bar.
 *
 * @component
 */
const ActionBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Bock</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ActionBar;
