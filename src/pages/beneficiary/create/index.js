import { Container, Card } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettings } from '../../../hooks';
import { Page, HeaderBreadcrumbs, Scrollbar } from '../../../components';

import CreateForm from './CreateForm';

// ----------------------------------------------------------------------

export default function Create({ title }) {
  const { themeStretch } = useSettings();

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading={`${title}: Create`}
        links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Create' }]}
      />
      <Card>
        <Scrollbar>
          <CreateForm />
        </Scrollbar>
      </Card>
    </Container>
  );
}
