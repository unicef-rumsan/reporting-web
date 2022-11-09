import { Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { PulsatingIcon } from '../../assets';
import useWSTransaction from '../../hooks/useTransactionTable';
import { useTransactionTableContext } from '../../contexts/TransactionTableContext';
import CustomTable from '../table/CustomTableBasic';

const TransactionTable = () => {
  const { getListData } = useTransactionTableContext();
  const [wsTableData, websocket] = useWSTransaction() || [{ data: {} }, { current: null }];
  const [refreshCounter, setRefreshCounter] = useState(0);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (!wsTableData?.data) return;
    setList((prev) => [wsTableData?.data, ...prev]);
  }, [wsTableData]);

  // useEffect(
  //   () => () => {
  //     websocket?.current?.close();
  //   },
  //   [refreshCounter, websocket]
  // );

  const fetchTableData = useCallback(async () => {
    const data = await getListData();
    setList(data.data);
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // const changeTableColor = (transactionDate) =>
  //   moment().isBefore(moment(transactionDate).add(10, 'seconds')) ? { backgroundColor: '#f0f0f0', color: 'black' } : {};

  const TABLE_HEAD = {
    createdAt: {
      id: 'timestamp',
      // id: 'timestamp',
      label: 'Timestamp',
      align: 'left',
    },
    txHash: {
      id: 'txHash',
      label: 'TxHash',
      align: 'left',
    },
    name: {
      id: 'name',
      label: 'Beneficiary',
      align: 'left',
    },

    // phone: {
    //   id: 'phone',
    //   label: 'Phone',
    //   align: 'left',
    // },
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
            <Grid container spacing={0.5}>
              <PulsatingIcon />
              <Typography variant="h6" sx={{ mt: -1.8 }}>
                Claimed Transactions ( {`${list.length}`} )
              </Typography>
            </Grid>
          }
        />
      </Stack>
      <CustomTable size="small" tableHeadersList={TABLE_HEAD} tableRowsList={list} />
    </Card>
  );
};

export default TransactionTable;
