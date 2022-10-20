import { useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAppAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _appAuthors, _appInstalled, _appRelated } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppTopInstalledCountries,
} from './components';
// assets
import { TransactionTable } from '../../components';
import ClaimBarchartWard from './components/ClaimBarchartWard';
import AmountClaimVsBudget from './components/AmountClaimVsBudget';
import { useModuleContext } from './context';
import SummaryCard from './components/SummaryCard';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  const theme = useTheme();

  const { themeStretch } = useSettings();
  const {
    getBeneficiaryCountByGender,
    countByGender,
    countByMethod,
    countByMode,
    getTransactionsCountByMethod,
    getTransactionsCountByMode,
    beneficiaryCounts,
    getBeneficiariesCounts,
  } = useModuleContext();

  console.log('beneficiaryCounts', beneficiaryCounts);

  useEffect(() => {
    getBeneficiaryCountByGender();
  }, [getBeneficiaryCountByGender]);

  useEffect(() => {
    getTransactionsCountByMethod();
  }, [getTransactionsCountByMethod]);

  useEffect(() => {
    getTransactionsCountByMode();
  }, [getTransactionsCountByMode]);

  useEffect(() => {
    getBeneficiariesCounts();
  }, [getBeneficiariesCounts]);

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <SummaryCard title="Total Beneficiaries Impacted" total={beneficiaryCounts?.impacted?.totalFamilyCount} />
          </Grid>

          <Grid item xs={12} md={4}>
            <SummaryCard title="Total Beneficiaries Claimed" total={4876} />
          </Grid>

          <Grid item xs={12} md={4}>
            <SummaryCard title="Children Below 5" total={beneficiaryCounts?.impacted?.totalBelow5Count} />
          </Grid>
          {/* TopMost Charts */}
          <>
            <Grid item xs={12} md={6}>
              <ClaimBarchartWard graphType="bar" title="Ward Wise Claim" subheader="(+43%) than last year" />
            </Grid>

            <Grid item xs={12} md={3}>
              <AmountClaimVsBudget
                title="Claimed Vs Budget"
                chartColors={[
                  theme.palette.primary.dark,
                  theme.palette.primary.light,
                  theme.palette.primary.lighter,
                  theme.palette.primary.main,
                ]}
                chartData={[
                  { label: 'Budget', value: 12244 },
                  { label: 'Claimed', value: 78343 },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <AmountClaimVsBudget
                title="Offline Vs Online"
                chartColors={[theme.palette.primary.main, theme.palette.primary.light]}
                chartData={countByMode}
              />
            </Grid>
          </>
          {/* 2nd  Charts */}
          <>
            <Grid item xs={12} md={3}>
              <AmountClaimVsBudget
                title="Claimed By Gender"
                chartColors={[
                  theme.palette.primary.lighter,
                  theme.palette.primary.light,
                  theme.palette.primary.main,
                  theme.palette.primary.dark,
                ]}
                chartData={countByGender}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <AmountClaimVsBudget
                title="Claim SMS vs QR"
                chartColors={[
                  theme.palette.primary.lighter,
                  theme.palette.primary.light,
                  theme.palette.primary.main,
                  theme.palette.primary.dark,
                ]}
                chartData={countByMethod}
              />
            </Grid>
          </>

          <Grid item xs={24} lg={24}>
            <TransactionTable />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Active Users"
              percent={''}
              total={''}
              chartColor={theme.palette.primary.main}
              chartData={[]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Installed"
              percent={0.2}
              total={4876}
              chartColor={theme.palette.chart.blue[0]}
              // chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Downloads"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
              chartData={[]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="Area Installed"
              subheader="(+43%) than last year"
              chartLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
              chartData={[
                {
                  year: '2019',
                  data: [
                    { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
                    { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    { name: 'Asia', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                    { name: 'America', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                  ],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated title="Top Related Applications" list={_appRelated} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors title="Top Authors" list={_appAuthors} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />
              <AppWidget title="Applications" total={55566} icon={'eva:email-fill'} color="warning" chartData={75} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
