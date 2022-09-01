import client from '../../services/client';

export default {
  groupLookup() {
    return client.get('/tags?type=ben_group');
  },
  list(params) {
    return client.get('/beneficiaries', { params });
  },
  get(uuid) {
    return client.get(`/beneficiaries/${uuid}`);
  },
  remove(uuid) {
    return client.delete(`/beneficiaries/${uuid}`);
  },
  create(data) {
    return client.post('/beneficiaries', data);
  },
  update(uuid, data) {
    return client.post(`/beneficiaries/${uuid}`, data);
  },
};
