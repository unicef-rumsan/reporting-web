import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import TableHeadCustom from './TableHeadCustom';
import Scrollbar from '../Scrollbar';
import truncateEthAddress from '../../utils/trimWalletAddress';
import { BLOCKCHAIN_EXPLORER } from '../../config';

CustomTable.propTypes = {
  size: PropTypes.string,
  tableRowsList: PropTypes.array.isRequired,
  tableHeadersList: PropTypes.object.isRequired,
};

export default function CustomTable({
  size = 'small',
  tableRowsList = [{ basic: 'Initial Table' }],
  tableHeadersList = {
    basic: {
      id: 'basic',
      label: 'basic',
      align: 'left',
    },
  },
}) {
  const conditionalRendering = (row, key) => {
    switch (key) {
      case 'txHash':
        return (
          <Button href={`${BLOCKCHAIN_EXPLORER}${row}`} target="_blank" rel="noopener noreferrer">
            {truncateEthAddress(row)}
          </Button>
        );
      // case 'vendor':
      //   return (
      //     <Button href={`${BLOCKCHAIN_EXPLORER}${row}`} target="_blank" rel="noopener noreferrer">
      //       {truncateEthAddress(row)}
      //     </Button>
      //   );
      case 'date':
        return moment(row).fromNow();
      case 'timestamp':
        return moment(row).fromNow();
      case 'createdAt':
        return moment(row).fromNow();
      default:
        return row;
    }
  };

  const renderTableCell = (list, head) =>
    list.map((listItem, index) => (
      <TableRow key={`${listItem.id}-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {Object.keys(head).map((headerKey) => {
          const tableKeyId = head[headerKey].id;
          return (
            <TableCell align={head[headerKey]?.align} component="th" scope="row" key={tableKeyId}>
              {conditionalRendering(listItem[tableKeyId], tableKeyId)}
            </TableCell>
          );
        })}
      </TableRow>
    ));

  return (
    <Scrollbar>
      <TableContainer>
        <Table size={size}>
          <TableHeadCustom headLabel={tableHeadersList} />
          <TableBody>{renderTableCell(tableRowsList, tableHeadersList)}</TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
