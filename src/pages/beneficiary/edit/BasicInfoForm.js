/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Typography, Stack } from '@mui/material';

import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { useApi } from '../../../hooks';

import { useModuleContext } from '../context';
import Service from '../service';
import { GENDERS } from '../constants';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  uuid: PropTypes.string,
  dataLoading: PropTypes.bool,
  formData: PropTypes.object,
};

export default function UserNewEditForm({ formData, uuid, dataLoading }) {
  const { benGroupList, loadBenGroupList } = useModuleContext();
  const createdData = useApi(Service.update, []);
  const request = useCallback((uuid, data) => createdData.request(uuid, data), [createdData]);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('gender is required'),
    email: Yup.string().email(),
    age: Yup.number(),
    group: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: formData?.name || '',
      email: formData.email || '',
      phone: formData?.phone || '',
      gender: formData?.gender || '',
      age: formData?.age || '',

      group: formData?.group || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    loadBenGroupList();
  }, []);

  useEffect(() => {
    if (formData) {
      reset(defaultValues);
    }
  }, [formData]);

  const onSubmit = async (v, a) => {
    try {
      // TODO:add wallet address
      await request(uuid, {
        name: values.name,
        group: values.group,
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
        Basic Information
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
          <RHFSelect name="group" label="Group" placeholder="Group">
            <option value="" />
            {benGroupList.map((option) => (
              <option key={option.id} value={option.tag}>
                {option.tag}
              </option>
            ))}
          </RHFSelect>
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
