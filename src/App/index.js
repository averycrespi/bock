import React, { useState, useEffect } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Content from "../Content";
import Footer from "../Footer";

import { fetchGroups } from "./fetch";
import { PALETTE } from "./palette";

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
      <Content groups={groups} />
      {groups.length > 0 && <Footer />}
    </ThemeProvider>
  );
};

export default App;
