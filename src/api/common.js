import client from './client';

const getNotificationsEndpoint = '/notification';
const getNotificationCountEndpoint = '/notification-count';
const getDashboardDataEndpoint = '/dashboard';

const getNotifications = () => {
  return client.get(getNotificationsEndpoint);
};

const getNotificationCount = () => {
  return client.get(getNotificationCountEndpoint);
};

const getDashboardData = () => {
  return client.get(getDashboardDataEndpoint);
};

export default {
  getNotifications,
  getNotificationCount,
  getDashboardData,
};
