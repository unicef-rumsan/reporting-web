// routes
import { PATH_DASHBOARD, PATH_PAGE, PATH_BENEFICIARY } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  beneficiary: getIcon('ic_booking'),
  vendors: getIcon('ic_invoice'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'beneficiary',
  //   items: [
  //     {
  //       name: 'list',
  //       label: 'Beneficiary',
  //       icon: ICONS.beneficiary,
  //       path: PATH_DASHBOARD.beneficiary.list,
  //     },
  //   ],
  // },

  {
    subheader: 'general',
    items: [
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },

      {
        title: 'beneficiary',
        path: PATH_BENEFICIARY.root,
        icon: ICONS.dashboard,
      },
    ],
  },
];

export default navConfig;
