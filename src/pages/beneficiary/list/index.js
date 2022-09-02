import { paramCase } from 'change-case';
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import useApi from '../../../hooks/useApi';
import { PATH_BENEFICIARY, PATH_DASHBOARD } from '../../../routes/paths';
// hooks

import { useTabs, useSettings, useTable, getComparator, emptyRows } from '../../../hooks';

// components

import {
  Iconify,
  Scrollbar,
  HeaderBreadcrumbs,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from '../../../components';
// sections
import ListTableRow from './ListTableRow';
import ListTableToolbar from './ListTableToolbar';
import { useModuleContext } from '../context';

import Service from '../service';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'gender', label: 'Gender', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'group', label: 'Group', align: 'left' },
  { id: 'balance', label: 'Balance', align: 'center' },
  // { id: '', label: 'Action', align: 'center' },
];

// ----------------------------------------------------------------------

List.propTypes = {
  title: PropTypes.string,
};

export default function List({ title }) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultDense: true, defaultRowsPerPage: 20 });
  const { searchText } = useModuleContext();

  const currentTableState = {
    page,
    limit: rowsPerPage,
    searchText,
  };

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const tableData = useApi(Service.list, { defaultDataState: [] });
  const requestTableData = useCallback(() => tableData.request(currentTableState), []);

  const handleDeleteRow = async (uuid) => {
    await Service.remove(uuid);
    setSelected([]);
    requestTableData();
  };

  const handleDeleteRows = (selected) => {
    console.log(selected);
    requestTableData();
  };

  useEffect(() => {
    requestTableData();
  }, [requestTableData]);

  const handleEditRow = (uuid) => {
    navigate(PATH_BENEFICIARY.edit(paramCase(uuid)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading={`${title}: List`}
        links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Beneficiaries' }]}
        action={
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_BENEFICIARY.create}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            New Beneficiary
          </Button>
        }
      />

      <Card>
        <ListTableToolbar />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {selected.length > 0 && (
              <TableSelectedActions
                dense={dense}
                numSelected={selected.length}
                rowCount={tableData?.data?.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData?.data?.map((row) => row.id)
                  )
                }
                actions={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}

            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData?.data?.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData?.data?.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <ListTableRow
                    key={row.id}
                    row={row}
                    selected={selected.includes(row.uuid)}
                    onSelectRow={() => onSelectRow(row.uuid)}
                    onDeleteRow={() => handleDeleteRow(row.uuid)}
                    onEditRow={() => handleEditRow(row.uuid)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData?.data?.length)}
                />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />

          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData?.data?.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData?.data?.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = tableData?.data?.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'all') {
    tableData = tableData?.data?.filter((item) => item.role === filterRole);
  }

  return tableData;
}
