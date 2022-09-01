import { InputAdornment, TextField } from '@mui/material';
import { useModuleContext } from '../context';
import Iconify from '../../../components/Iconify';

const ListSearchField = () => {
  const { filter, setListFilter } = useModuleContext();

  const onSearchText = (e) => {
    setListFilter('searchText', e.target.value);
  };

  return (
    <TextField
      fullWidth
      value={filter.searchText}
      onChange={onSearchText}
      placeholder="Search user..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ListSearchField;
