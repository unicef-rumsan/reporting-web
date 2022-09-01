/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Typography, Grid, Stack } from '@mui/material';

import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { useApi } from '../../../hooks';

import Service from '../service';
import { GENDERS } from '../constants';

// ----------------------------------------------------------------------

const groups = [
  {
    value: 'maternal',
    label: 'Maternal',
  },
  {
    value: 'disabled',
    label: 'Disabled',
  },
];

UserNewEditForm.propTypes = {
  dataLoading: PropTypes.bool,
  formData: PropTypes.object,
};

export default function UserNewEditForm({ formData, dataLoading }) {
  const createdData = useApi(Service.create, []);
  const request = useCallback((data) => createdData.request(data), [createdData]);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    education: Yup.string(),
    profession: Yup.string(),
    permanentAddress: Yup.string(),
    governmentId: Yup.string(),
    adult: Yup.string(),
    child: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      education: formData?.education || '',
      profession: formData?.profession || '',
      permanentAddress: formData?.permanentAddress || '',
      governmentId: formData?.governmentId || '',
      adult: formData?.adult || '',
      child: formData?.child || '',
    }),
    [formData]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (formData) {
      reset(defaultValues);
    }
  }, [formData]);

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
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };
  const onError = async (v, a) => {
    console.log('v,Erra', { v, a });
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="subtitle1" paragraph sx={{ pb: 2 }}>
        Additional Information
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onError)}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <RHFTextField name="permanentAddress" label="Permanent Address" />
          <RHFTextField name="education" label="Education" />
          <RHFTextField name="profession" label="Profession" />
          <RHFTextField name="governmentId" label="Government ID" />
          <RHFTextField name="adult" label="Number of adults in household" />
          <RHFTextField name="child" label="Number of children in household" />
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={!isDirty}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
