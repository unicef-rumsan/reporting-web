import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Avatar, Checkbox, TableRow, TableCell, Typography, Link, MenuItem } from '@mui/material';

import { PATH_BENEFICIARY } from '../../../routes/paths';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';

// ----------------------------------------------------------------------

ListTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ListTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { id, name, avatarUrl, phone, group, gender, balance } = row;
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {/* <Link to={PATH_BENEFICIARY.edit(id)} variant="body2" component={RouterLink}> */}
          {name}
          {/* </Link> */}
        </Typography>
      </TableCell>

      <TableCell align="left">{gender}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {phone}
      </TableCell>

      <TableCell align="left">{group}</TableCell>
      <TableCell align="left">{balance}</TableCell>

      {/* <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell> */}
    </TableRow>
  );
}
