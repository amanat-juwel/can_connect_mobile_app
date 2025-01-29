import client from './client';

const completeRequestEndpoint = '/update-request-status';
const acceptRequestEndpoint = '/update-request-status';
const getDistanceEndpoint = '/distance-measure';

const completeRequest = (payload) => {
  return client.patch(completeRequestEndpoint, payload);
};

const acceptRequest = (payload) => {
  return client.patch(acceptRequestEndpoint, payload);
};

const getDistance = (payload) => {
  return client.post(getDistanceEndpoint, payload);
};

export default {
  completeRequest,
  acceptRequest,
  getDistance,
};
