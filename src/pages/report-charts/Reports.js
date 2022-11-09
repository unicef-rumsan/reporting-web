/* eslint-disable import/no-unresolved */
import { useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Container, Grid, TextField, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import HeaderBreadcrumbs from '@components/HeaderBreadcrumbs';
import { useSettings } from '@hooks';
import { PATH_DASHBOARD } from '@routes/paths';
import Filter from './Filter';
import { useModuleContext } from './context';
import Piechart from './Piechart';
import Barchart from './Barchart';
// import Barchart from './BarChart';

Reports.propTypes = {
  title: PropTypes.string,
};

export default function Reports({ title }) {
  const { themeStretch } = useSettings();
  const { groupingData, getGroupingData } = useModuleContext();
  const theme = useTheme();

  useEffect(() => {
    getGroupingData();
  }, [getGroupingData]);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading={`${title}: Charts`}
        links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: title }]}
      />
      <Card>
        <CardHeader action={<Filter />} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Barchart
                graphType="bar"
                title="Age Wise"
                subheader="(+43%) than last year"
                chartLabels={groupingData.ageRange.chartLabels}
                chartData={groupingData.ageRange.chartData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Barchart
                graphType="line"
                title="Some Report"
                subheader="(+43%) than last year"
                chartLabels={groupingData.ageRange.chartLabels}
                chartData={groupingData.ageRange.chartData}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Piechart
                title="Has Bank"
                chartColors={[
                  theme.palette.primary.dark,
                  theme.palette.primary.light,
                  theme.palette.primary.lighter,
                  theme.palette.primary.main,
                ]}
                chartData={groupingData?.hasBank}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Piechart
                title="Has Phone"
                chartColors={[
                  theme.palette.primary.dark,
                  theme.palette.primary.light,
                  theme.palette.primary.lighter,
                  theme.palette.primary.main,
                ]}
                chartData={groupingData?.hasPhone}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Piechart
                title="Daily Wage"
                chartColors={[
                  theme.palette.primary.dark,
                  theme.palette.primary.light,
                  theme.palette.primary.lighter,
                  theme.palette.primary.main,
                ]}
                chartData={groupingData?.dailyWage}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Piechart
                title="Land Owner"
                chartColors={[
                  theme.palette.primary.dark,
                  theme.palette.primary.light,
                  theme.palette.primary.lighter,
                  theme.palette.primary.main,
                ]}
                chartData={groupingData?.landOwner}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Piechart
                title="Disability"
                chartColors={[
                  theme.palette.primary.dark,
                  theme.palette.primary.light,
                  theme.palette.primary.lighter,
                  theme.palette.primary.main,
                ]}
                chartData={groupingData?.disability}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
