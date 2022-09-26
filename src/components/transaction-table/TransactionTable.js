import { Button, Card, CardHeader, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { PulsatingIcon } from '../../assets';
import useWSTransaction from '../../hooks/useTransactionTable';
import { useTransactionTableContext } from '../../contexts/TransactionTableContext';
import Scrollbar from '../Scrollbar';
import { TableHeadCustom } from '../table';
import truncateEthAddress from '../../utils/trimWalletAddress';

const TransactionTable = () => {
  const { getListData } = useTransactionTableContext();
  const [wsTableData, websocket] = useWSTransaction() || [{ data: {} }, { current: null }];
  const [refreshCounter, setRefreshCounter] = useState(0);

  const [list, setList] = useState([]);

  useEffect(() => {
    console.log('wsTableData', wsTableData);
    if (!wsTableData?.data) return;

    setList((prev) => [wsTableData?.data, ...prev]);
  }, [wsTableData]);

  useEffect(() => {
    return () => {
      websocket?.current?.close();
    };
  }, [refreshCounter, websocket]);

  const fetchTableData = useCallback(async () => {
    const data = await getListData();
    setList(data.data);
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const changeTableColor = (transactionDate) =>
    moment().isBefore(moment(transactionDate).add(10, 'seconds')) ? { backgroundColor: '#f0f0f0', color: 'black' } : {};

  const TABLE_HEAD = {
    time: {
      id: 'time',
      label: 'Timestamp',
      align: 'left',
    },
    txHash: {
      id: 'txHash',
      label: 'TxHash',
      align: 'left',
    },
    vendor: {
      id: 'vendor',
      label: 'Vendor',
      align: 'left',
    },
    // beneficiary: {
    //   id: 'beneficiary',
    //   label: 'Beneficiary',
    //   align: 'left',
    // },
    phone: {
      id: 'phone',
      label: 'phone',
      align: 'left',
    },
    amount: {
      id: 'amount',
      label: 'Amount',
      align: 'left',
    },

    ward: {
      id: 'ward',
      label: 'Ward',
      align: 'left',
    },
    method: {
      id: 'method',
      label: 'Method',
      align: 'left',
    },
    mode: {
      id: 'mode',
      label: 'Mode',
      align: 'left',
    },
  };

  return (
    <Card>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2 }}>
        <CardHeader
          title={
            <>
              <PulsatingIcon>Claimed Transactions ( {`${list.length}`} )</PulsatingIcon>
            </>
          }
        />
      </Stack>
      <Scrollbar>
        <TableContainer>
          <Table size="small">
            <TableHeadCustom headLabel={TABLE_HEAD} />
            <TableBody>
              {list?.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {moment(item.createdAt).fromNow()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      href={`https://www.blockchain.com/en/search?search=${item.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {truncateEthAddress(item.txHash)}
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      href={`https://www.blockchain.com/en/search?search=${item.vendor}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {truncateEthAddress(item.vendor)}
                    </Button>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {item.vendor}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.amount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.ward}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.method}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.mode}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};

export default TransactionTable;
