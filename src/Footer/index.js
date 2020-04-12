import React from "react";
import { Box, Typography, Link } from "@material-ui/core";

/**
 * Render the footer.
 *
 * @component
 */
const Footer = () => {
  return (
    <Box align="center" m={1}>
      <Typography variant="body1">
        <Link href="https://github.com/averycrespi/bock">
          Made with ❤ by Avery Crespi
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
