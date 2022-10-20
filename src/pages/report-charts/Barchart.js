import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { BaseOptionChart } from '../../components/chart';

// ----------------------------------------------------------------------

Barchart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  graphType: PropTypes.string,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function Barchart({ title, subheader, graphType = 'bar', chartData, chartLabels, ...other }) {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type={graphType} series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
