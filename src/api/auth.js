import { isEmail } from '../utility/validation.helper';
import client from './client';

const loginEndpoint = '/login';
const logoutEndpoint = '/logout';
const requestOtpEndpoint = '/otp-request';
const otpLoginEndpoint = '/otp-login';

const login = (id, password) => {
  const idType = isEmail(id) ? 'email' : 'phone';
  let payload = {
    email: '',
    phone: '',
    password,
    [idType]: id,
  };
  return client.post(loginEndpoint, payload);
};

const logout = () => {
  return client.post(logoutEndpoint);
};

const requestOtp = (id) => {
  const idType = isEmail(id) ? 'email' : 'phone';
  let payload = {
    email: '',
    phone: '',
    [idType]: id,
  };
  return client.post(requestOtpEndpoint, payload);
};

const loginByOtp = (id, code) => {
  const idType = isEmail(id) ? 'email' : 'phone';
  let payload = {
    email: '',
    phone: '',
    code,
    [idType]: id,
  };
  return client.post(otpLoginEndpoint, payload);
};

export default {
  login,
  loginByOtp,
  logout,
  requestOtp,
};
