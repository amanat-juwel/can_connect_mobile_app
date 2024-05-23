import * as SecureStore from 'expo-secure-store';

const tokenKey = 'authToken';
const userKey = 'user';

const storeSession = async (session) => {
  try {
    storeToken(session.token);
    storeUser(session.user);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(tokenKey, authToken);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

const storeUser = async (user) => {
  try {
    await SecureStore.setItemAsync(userKey, JSON.stringify(user));
  } catch (error) {
    console.log('Error storing the user', error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(tokenKey);
  } catch (error) {
    console.log('Error getting the auth token', error);
  }
};

const getUser = async () => {
  try {
    return JSON.parse(await SecureStore.getItemAsync(userKey));
  } catch (error) {
    console.log('Error getting the user', error);
  }
};

const removeSession = async () => {
  try {
    await SecureStore.deleteItemAsync(tokenKey);
    await SecureStore.deleteItemAsync(userKey);
  } catch (error) {
    console.log('Error removing the session', error);
  }
};

export default {
  getToken,
  getUser,
  removeSession,
  storeSession,
};
