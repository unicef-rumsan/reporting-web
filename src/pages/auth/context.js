import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import useApi from '../../hooks/useApi';
import Services from './service';
import useAppAuth from '../../hooks/useAppAuth';

const initialState = {
  login: (email, password) => {
    console.log(email, password);
  },
};

export const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const authLogin = useApi(Services.login, { defaultDataState: [] });
  const { addToken } = useAppAuth();

  const login = async (email, password) => {
    await authLogin.request({ email, password });
    addToken(authLogin.data.accessToken);

    if (authLogin.error) {
      return null;
    }
    return authLogin.data;
  };

  const contextProps = {
    ...initialState,
    login,
  };

  return <Context.Provider value={contextProps}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useModuleContext = () => useContext(Context);
