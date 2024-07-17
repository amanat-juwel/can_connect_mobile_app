import client from './client';

const storeRequestEndpoint = '/store-request';
const requestTrailEndpoint = '/track-request';
const cancelRequestEndpoint = '/update-request-status';

const storeRequest = (payload) => {
  return client.post(storeRequestEndpoint, payload);
};

const getRequestTrail = (sku) => {
  return client.post(requestTrailEndpoint, sku);
};

const cancelRequest = (payload) => {
  return client.patch(cancelRequestEndpoint, payload);
};
export default {
  storeRequest,
  getRequestTrail,
  cancelRequest,
};
