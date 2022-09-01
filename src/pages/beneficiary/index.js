import { Container } from '@mui/material';
import PropTypes from 'prop-types';

import { ContextProvider } from './context';
import { useSettings } from '../../hooks';
import { Page } from '../../components';
import { TITLE } from './constants';

import List from './list';
import Create from './create';
import Edit from './edit';

Module.propTypes = {
  page: PropTypes.string,
};

export default function Module({ page, ...restProps }) {
  const { themeStretch } = useSettings();
  const pageSelect = () => {
    switch (page) {
      case 'create':
        return <Create {...restProps} title={TITLE} />;
      case 'edit':
        return <Edit {...restProps} title={TITLE} />;

      default:
        return <List {...restProps} title={TITLE} />;
    }
  };

  return (
    <ContextProvider>
      <Page title={TITLE}>
        <Container maxWidth={themeStretch ? false : 'lg'}>{pageSelect()}</Container>
      </Page>
    </ContextProvider>
  );
}
