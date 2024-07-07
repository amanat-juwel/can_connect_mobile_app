import client from './client';

const getNotificationsEndpoint = '/notification';
const getNotificationCountEndpoint = '/notification-count';
const getDashboardDataEndpoint = '/dashboard';
const getHomePageEndpoint = '/homepage';
const getHistoryEndpoint = '/request-list';
const getRequestListEndpoint = '/request-list';

const getNotifications = () => {
  return client.get(getNotificationsEndpoint);
};

const getNotificationCount = () => {
  return client.get(getNotificationCountEndpoint);
};

const getDashboardData = () => {
  return client.get(getDashboardDataEndpoint);
};

const getHomePage = () => {
  return client.get(getHomePageEndpoint);
};

const getHistory = (payload) => {
  return client.get(getHistoryEndpoint, payload);
};

const getRequestList = (payload) => {
  return client.get(getRequestListEndpoint, payload);
};

export default {
  getNotifications,
  getNotificationCount,
  getDashboardData,
  getHomePage,
  getHistory,
  getRequestList,
};
