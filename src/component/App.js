import React, { useState, useEffect } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import ActionBar from "./ActionBar";
import ContentGrid from "./ContentGrid";

import { fetchGroups } from "../logic/api";
import { PALETTE } from "../style/palette";

const theme = createMuiTheme({ palette: PALETTE });

/**
 * Renders the application.
 *
 * @component
 */
const App = () => {
  const [groups, setGroups] = useState([]);

  // Load groups when the component mounts.
  useEffect(() => fetchGroups(setGroups), []);

  return (
    <ThemeProvider theme={theme}>
      <ActionBar />
      <ContentGrid groups={groups} />
    </ThemeProvider>
  );
};

export default App;
