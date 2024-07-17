import client from './client';

const completeRequestEndpoint = '/update-request-status';
const acceptRequestEndpoint = '/update-request-status';

const completeRequest = (payload) => {
  return client.patch(completeRequestEndpoint, payload);
};

const acceptRequest = (payload) => {
  return client.patch(acceptRequestEndpoint, payload);
};

export default {
  completeRequest,
  acceptRequest,
};
