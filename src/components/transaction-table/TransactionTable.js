import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import useWSTransaction from '../../hooks/useTransactionTable';
import { useTransactionTableContext } from '../../contexts/TransactionTableContext';
import Scrollbar from '../Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData } from '../table';
import TransactionTableRow from './TransactionTableRow';

const TransactionTable = () => {
  const { getListData } = useTransactionTableContext();
  const [wsTableData, websocket] = useWSTransaction() || [{ data: {} }, { current: null }];
  const [refreshCounter, setRefreshCounter] = useState(0);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (!wsTableData?.data) return;
    setList((prev) => [wsTableData?.data, ...prev]);
  }, [wsTableData]);

  useEffect(() => {
    return () => {
      websocket?.close();
    };
  }, [refreshCounter, websocket]);

  const fetchTableData = useCallback(async () => {
    const data = await getListData();
    setList(data.data);
  }, []);
  console.log('list', list);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const changeTableColor = (transactionDate) =>
    moment().isBefore(moment(transactionDate).add(10, 'seconds')) ? { backgroundColor: '#f0f0f0', color: 'black' } : {};

  return (
    <Scrollbar>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Block Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((item) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {moment(item.createdAt).fromNow()}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.vendor}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.phone}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.amount}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.blockNumber}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
};

export default TransactionTable;
