import { useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useModuleContext } from '../context';

const ListSelectFilter = ({ label }) => {
  const { filter, setListFilter, benGroupList, loadBenGroupList } = useModuleContext();

  const onFilterRole = (e) => {
    setListFilter('filterGroup', e.target.value);
  };

  useEffect(() => {
    loadBenGroupList();
  }, []);

  const optionsData = [
    {
      label: 'Ward',
      value: 'ward',
    },
    {
      label: 'Village',
      value: 'village',
    },
  ];

  return (
    <TextField
      fullWidth
      select
      label={label}
      value={filter.filterGroup}
      onChange={onFilterRole}
      SelectProps={{
        MenuProps: {
          sx: { '& .MuiPaper-root': { maxHeight: 260 } },
        },
      }}
      sx={{
        maxWidth: { sm: 240 },
        textTransform: 'capitalize',
      }}
    >
      {benGroupList.map((option) => (
        <MenuItem
          key={option.id}
          value={option.tag}
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
          }}
        >
          {option.tag}
        </MenuItem>
      ))}
    </TextField>
  );
};

ListSelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
};

export default ListSelectFilter;
