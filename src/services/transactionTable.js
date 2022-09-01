import client from './client';

export const transactionList = () => client.get('/transactions');
