import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { useApi } from '../../../hooks';

import { useModuleContext } from '../context';
import Service from '../service';
import { GENDERS } from '../constants';

// ----------------------------------------------------------------------

CreateForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function CreateForm({ isEdit, currentUser }) {
  const { benGroupList, loadBenGroupList } = useModuleContext();
  const navigate = useNavigate();
  const createdData = useApi(Service.create, []);
  const request = useCallback((data) => createdData.request(data), [createdData]);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone number is required'),
    group: Yup.string().required('group  is required'),
    gender: Yup.string().required('gender is required'),
    email: Yup.string().email(),
    age: Yup.string(),
    education: Yup.string(),
    profession: Yup.string(),
    permanentAddress: Yup.string(),
    governmentId: Yup.string(),
    adult: Yup.number(),
    child: Yup.number(),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {},
  });

  useEffect(() => {
    loadBenGroupList();
  }, []);

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async (v, a) => {
    try {
      // TODO:add wallet address
      await request({
        name: values.name,
        phone: values.phone,
        walletAddress: '0x0',
        // group: 'ben_group',
        gender: 'M',
        dob: '2002-5-5',
      });
      //   await request({ ...values, walletAddress: 'sda' });
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.beneficiary.list);
    } catch (error) {
      console.error(error);
    }
  };
  const onError = async (v, a) => {
    console.log('v,Erra', { v, a });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onError)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={24}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="phone" label="Phone Number" />

              <RHFTextField name="email" label="Email Address" />
              <RHFSelect name="gender" label="Gender" placeholder="Gender">
                <option value="" />
                {GENDERS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="age" label="Age" />
              <RHFTextField name="permanentAddress" label="Permanent Address" />
              <RHFTextField name="education" label="Education" />
              <RHFTextField name="profession" label="Profession" />
              <RHFTextField name="governmentId" label="Government ID number" />
              <RHFSelect name="group" label="Group" placeholder="Group">
                <option value="" />
                {benGroupList.map((option) => (
                  <option key={option.id} value={option.tag}>
                    {option.tag}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="familyMembers" label="Family Members" />
              <RHFTextField name="adult" label="Adult" />
              <RHFTextField name="child" label="Child" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
