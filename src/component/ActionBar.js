import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default function ActionBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Bock</Typography>
      </Toolbar>
    </AppBar>
  );
}
