import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";
import palette from "./palette";

const theme = createMuiTheme({ palette: palette });

var app = document.getElementById("app");
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  app
);
