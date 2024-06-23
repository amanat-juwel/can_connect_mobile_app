import client from './client';

const getNotificationsEndpoint = '/notification';
const getDashboardDataEndpoint = '/notification';

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
