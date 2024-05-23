import { isEmail } from '../utility/validation.helper';
import client from './client';

const loginEndpoint = '/login';
const logoutEndpoint = '/logout';

const login = (id, password) => {
  const idType = isEmail(id) ? 'email' : 'phone';
  let payload = {
    password,
    [idType]: id,
  };
  return client.post(loginEndpoint, payload);
};

const logout = () => {
  return client.post(logoutEndpoint);
};

export default {
  login,
  logout,
};
