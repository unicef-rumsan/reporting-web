import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
// components
import ListSearchField from './ListSearchField';
import ListSelectFilter from './ListSelectFilter';

// ----------------------------------------------------------------------

ListTableToolbar.propTypes = {};

export default function ListTableToolbar() {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <ListSelectFilter label={'Ward'} />

      <ListSearchField />
    </Stack>
  );
}
