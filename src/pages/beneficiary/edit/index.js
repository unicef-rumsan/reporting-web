import { Container, Grid, Stack, Backdrop, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD, PATH_BENEFICIARY } from '../../../routes/paths';
import { useSettings, useApi } from '../../../hooks';
import { HeaderBreadcrumbs } from '../../../components';

import Service from '../service';
import BasicInfoForm from './BasicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';

// ----------------------------------------------------------------------

export default function Edit() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { uuid = null } = useParams();

  const formData = useApi(Service.get, { defaultDataState: {} });
  const removeBeneficiary = useApi(Service.remove, { defaultDataState: {} });

  const handleDelete = async () => {
    removeBeneficiary.request(uuid);
    navigate(PATH_BENEFICIARY.root);
  };

  useEffect(() => {
    formData.request(uuid);
  }, []);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={formData.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <HeaderBreadcrumbs
        heading={formData.data.name || 'Beneficiary Details'}
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Beneficiaries', href: PATH_BENEFICIARY.root },
          { name: 'Edit' },
        ]}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={24}>
          <Stack spacing={3}>
            <BasicInfoForm formData={formData.data} dataLoading={formData.loading} uuid={uuid} />
            <AdditionalInfoForm formData={formData.data} dataLoading={formData.loading} />
          </Stack>
          <Stack justifyContent="flex-end" direction="row" spacing={4} sx={{ mt: 3 }}>
            <LoadingButton
              type="button"
              variant="outlined"
              color="error"
              loading={removeBeneficiary.loading}
              disabled={removeBeneficiary.loading}
              onClick={handleDelete}
            >
              Delete Beneficiary
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
