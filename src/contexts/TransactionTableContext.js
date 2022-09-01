import PropTypes from 'prop-types';
import { useContext, createContext } from 'react';
import { transactionList } from '../services/transactionTable';

const initialState = {
  transactions: [],
  loading: false,
  getListData: () => {},
};

export const TransactionTableContext = createContext(initialState);

export const TransactionTableContextProvider = ({ children }) => {
  // const [state,dispatch] = useReducer()

  const getListData = async () => {
    const data = await transactionList();
    return data.data;
  };

  const contextValue = {
    ...initialState,
    getListData,
  };

  return <TransactionTableContext.Provider value={contextValue}>{children}</TransactionTableContext.Provider>;
};

TransactionTableContextProvider.propTypes = {
  children: PropTypes.node,
};

export const useTransactionTableContext = () => useContext(TransactionTableContext);
