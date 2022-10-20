import axios from 'axios';
import qs from 'query-string';
import { HOST_API } from '../config';

import { getAccessToken } from '../utils/sessionManager';

const accessToken = getAccessToken();
const projectId = '6322e108728b5f001ba00202';

const api = axios.create({
  //   baseURL: 'https://minimal-assets-api-dev.vercel.app',
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
    accessToken,
    projectId,
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});

export default api;
