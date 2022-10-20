// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';
const ROOTS_BENEFICIARY = '/beneficiaries';
const ROOTS_REPORT_CHARTS = '/reports';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_BENEFICIARY = {
  root: ROOTS_BENEFICIARY,
  create: path(ROOTS_BENEFICIARY, '/create'),
  edit: (uuid) => path(ROOTS_BENEFICIARY, `/${uuid}/edit`),
};

export const PATH_REPORT_CHARTS = {
  root: ROOTS_REPORT_CHARTS,
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    mobilizer: path(ROOTS_DASHBOARD, '/mobilizer'),
    projects: path(ROOTS_DASHBOARD, '/projects'),
    vendors: path(ROOTS_DASHBOARD, '/vendors'),
    financialInstitution: path(ROOTS_DASHBOARD, '/financial-institution'),
  },

  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
