import React from 'react';
import PropTypes from "prop-types";
import { AppBar, TextField, Toolbar, Typography } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function TopBar(props) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap>Bock</Typography>
                <Autocomplete
                    options={props.series}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                />
            </Toolbar>
        </AppBar>
    );
}

TopBar.propTypes = {
    series: PropTypes.arrayOf(PropTypes.object).isRequired
};