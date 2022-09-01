import client from './client';

export const benefiaryList = () => client.get('/beneficiaries');
