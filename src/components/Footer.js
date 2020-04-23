import { Box, Link, Typography } from "@material-ui/core";

import React from "react";

const Footer = () => (
  <Box align="center" m={1}>
    <Typography variant="body1">
      <Link href="https://github.com/averycrespi/bock">
        Made with ❤ by Avery Crespi
      </Link>
    </Typography>
  </Box>
);

export default Footer;
