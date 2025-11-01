import { isEmail } from '../utility/validation.helper';
import client from './client';

const loginEndpoint = '/login';
const logoutEndpoint = '/logout';
const requestOtpEndpoint = '/otp-request';
const otpLoginEndpoint = '/otp-login';
const forgotPasswordEndpoint = '/forgot-password';
const deleteAccountEndpoint = '/delete-account';

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

const deleteAccount = () => {
  return client.post(deleteAccountEndpoint);
};

const requestOtp = (phone = '', email = '') => {
  let payload = {
    email,
    phone,
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

const requestForgotPassword = (email) => {
  let payload = {
    email,
  };
  return client.post(forgotPasswordEndpoint, payload);
};

export default {
  login,
  loginByOtp,
  logout,
  deleteAccount,
  requestOtp,
  requestForgotPassword,
};
