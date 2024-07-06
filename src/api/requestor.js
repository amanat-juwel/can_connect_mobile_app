import client from './client';

const storeRequestEndpoint = '/store-request';

const storeRequest = (payload) => {
  return client.post(storeRequestEndpoint, payload);
};

export default {
  storeRequest,
};
