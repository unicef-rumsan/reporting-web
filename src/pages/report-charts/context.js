import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Service from './service';

const initialState = {
  groupingData: {
    dailyWage: [],
    landOwner: [],
    ageRange: {
      chartData: [],
      chartLabels: [],
    },
    disability: [],
    phoneOwnership: [],
    hasBank: [],
    hasPhone: [],
  },
  getGroupingData: () => {},
};

export const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getGroupingData = useCallback(async () => {
    const {
      data: { data: groupingData },
    } = await Service.getBeneficiaryGroupingData();
    setState((prevState) => ({
      ...prevState,
      groupingData,
    }));
  }, []);

  const contextProps = {
    ...state,
    getGroupingData,
  };

  return <Context.Provider value={contextProps}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useModuleContext = () => useContext(Context);
