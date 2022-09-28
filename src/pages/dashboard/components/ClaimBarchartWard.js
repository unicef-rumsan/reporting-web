import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import { BaseOptionChart } from '../../../components/chart';
import { useModuleContext } from '../context';

// ----------------------------------------------------------------------

WardWiseClaim.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  graphType: PropTypes.string,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function WardWiseClaim({ title, subheader, graphType = 'bar', ...other }) {
  const [seriesData, setSeriesData] = useState(String(new Date().getFullYear()));

  const { getTransactionsCountByWard, dashboardWardChartData } = useModuleContext();

  const handleChangeSeriesData = (event) => {
    setSeriesData(event.target.value);
  };

  useEffect(() => {
    getTransactionsCountByWard(seriesData);
  }, [getTransactionsCountByWard, seriesData]);

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: dashboardWardChartData.chartLabel,
    },
  });
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral',
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {dashboardWardChartData.allAvailableYears.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        }
      />

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart
          type={graphType}
          series={dashboardWardChartData.chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
