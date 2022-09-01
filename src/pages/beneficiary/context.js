import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Service from './service';

const initialState = {
  benGroupList: [],
  loadBenGroupList: () => {},
  filter: {
    filterGroup: '',
    searchText: '',
  },
  setListFilter: () => {},
};

export const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    searchText: '',
    filterGroup: '',
  });

  const [benGroupList, setBenGroupList] = useState([]);
  const loadBenGroupList = async () => {
    if (!benGroupList.length)
      Service.groupLookup()
        .then((result) => setBenGroupList(result.data.data))
        .catch(() => console.log('Error: cannot load beneficiary group list.'));
  };

  const setListFilter = (field, value) => {
    setFilter(() => ({ [field]: value }));
    // setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const contextProps = {
    benGroupList,
    loadBenGroupList,
    setListFilter,
    filter,
  };

  return <Context.Provider value={contextProps}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useModuleContext = () => useContext(Context);
