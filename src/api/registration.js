import client from './client';

const registerUserEndpoint = '/register';

const registerUser = (payload) => {
  return client.post(registerUserEndpoint, payload);
};

export default {
  registerUser,
};
