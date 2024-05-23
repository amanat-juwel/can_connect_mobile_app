import { create } from 'apisauce';
import authStorage from '../auth/storage';

const apiClient = create({
  baseURL: 'https://can-connect.v-linkpos.com/api',
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;

  request.headers['Authorization'] = `Bearer ${authToken}`;
});

export default apiClient;
