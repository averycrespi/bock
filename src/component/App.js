import React, { useState, useEffect } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import ContentGrid from "./content/ContentGrid";

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
  useEffect(() => {
    fetchGroups()
      .then((groups) => {
        setGroups(groups);
        console.debug(groups);
      })
      .catch(console.error);
    return; // Avoid useEffect async warning.
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ContentGrid groups={groups} />
    </ThemeProvider>
  );
};

export default App;
