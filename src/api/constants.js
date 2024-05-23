import client from './client';

const endpoint = '/public/constants';
const getConstants = () => client.get(endpoint);

export default {
  getConstants,
};
