import client from './client';

const registerUserEndpoint = '/register';
const updateProfileEndpoint = '/update-profile';

const registerUser = (payload) => {
  return client.post(registerUserEndpoint, payload);
};

const updateProfile = (payload) => {
  return client.post(updateProfileEndpoint, payload);
};

export default {
  registerUser,
  updateProfile,
};
