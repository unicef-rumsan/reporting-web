import { Container } from '@mui/material';
import PropTypes from 'prop-types';

import { ContextProvider } from './context';
import { useSettings } from '../../hooks';
import { Page } from '../../components';
import Reports from './Reports';

Module.propTypes = {};

const TITLE = 'Reports';

export default function Module() {
  const { themeStretch } = useSettings();

  return (
    <ContextProvider>
      <Page title={TITLE}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Reports title={TITLE} />
        </Container>
      </Page>
    </ContextProvider>
  );
}
