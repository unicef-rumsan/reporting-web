import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import FilterSelect from './FilterSelect';

function Filter() {
  return (
    <Grid container spacing={1}>
      {/* <Grid item md={2} sm={6} xs={12}>
        <Typography sx={{ mt: 0.5, fontWeight: 400 }} variant="h4">
          Filter{' '}
        </Typography>
      </Grid> */}
      <Grid item md={6} sm={12} xs={12}>
        <FilterSelect
          label="Ward"
          options={[
            {
              value: '1',
              label: 'Ward 1',
            },
            {
              value: '2',
              label: 'Ward 2',
            },
            {
              value: '3',
              label: 'Ward 3',
            },
          ]}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <FilterSelect
          label="Project"
          options={[
            {
              value: '1',
              label: 'Project 1',
            },
            {
              value: '2',
              label: 'Project 2',
            },
            {
              value: '3',
              label: 'Project 3',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}

Filter.propTypes = {};

export default Filter;
