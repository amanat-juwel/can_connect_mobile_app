import client from './client';

const getNotificationsEndpoint = '/notification';
const getDashboardDataEndpoint = '/dashboard';

const getNotifications = () => {
  return client.get(getNotificationsEndpoint);
};

const getDashboardData = () => {
  return client.get(getDashboardDataEndpoint);
};

export default {
  getNotifications,
  getDashboardData,
};
