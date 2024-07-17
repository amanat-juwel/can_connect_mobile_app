import client from './client';

const storeRequestEndpoint = '/store-request';
const requestTrailEndpoint = '/track-request';

const storeRequest = (payload) => {
  return client.post(storeRequestEndpoint, payload);
};

const getRequestTrail = (sku) => {
  return client.post(requestTrailEndpoint, sku);
};

export default {
  storeRequest,
  getRequestTrail,
};
