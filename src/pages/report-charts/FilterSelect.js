import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Stack, TextField } from '@mui/material';

const FilterSelect = ({ label, options }) => {
  const [value, setValue] = React.useState('');
  return (
    <Stack sx={{ px: 2 }}>
      <TextField
        label={label}
        select
        size="small"
        fullWidth
        SelectProps={{
          MenuProps: {
            sx: {
              '& .MuiPaper-root': { maxHeight: 260 },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          minWidth: {
            md: 100,
          },
          textTransform: 'capitalize',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

FilterSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
};

export default FilterSelect;
