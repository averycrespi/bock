import React, { useState, useEffect } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import ContentGrid from "./ContentGrid";

import { fetchGroups } from "../logic/api";
import { PALETTE } from "../style/palette";

const theme = createMuiTheme({ palette: PALETTE });

export default function App() {
  const [groups, setGroups] = useState([]);

  // Load groups when the component mounts.
  useEffect(() => fetchGroups(setGroups), []);

  return (
    <ThemeProvider theme={theme}>
      <ContentGrid groups={groups} />
    </ThemeProvider>
  );
}
