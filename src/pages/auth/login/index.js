import { Container } from '@mui/material';

import Login from './Login';
import { ContextProvider } from '../context';
import { useSettings } from '../../../hooks';
import TITLE from '../constants';

const Module = ({ ...restProps }) => {
  const { themeStretch } = useSettings();

  return (
    <ContextProvider>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Login {...restProps} title={TITLE.LOGIN} />
      </Container>
    </ContextProvider>
  );
};

export default Module;
