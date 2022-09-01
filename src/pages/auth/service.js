import client from '../../services/client';

export default {
  login(data) {
    return client.post('/users/login', data);
  },
};
