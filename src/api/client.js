import { create } from 'apisauce';
import authStorage from '../auth/storage';

const apiClient = create({
  baseURL: 'https://can-connect.v-linkpos.com/api',
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;

  request.headers.Authorization = `Bearer ${authToken}`;
});

apiClient.addMonitor((response) => {
  console.log('[API Request]:', {
    url: response.config.url,
    method: response.config.method,
    data: response.config.params,
  });

  console.log('[API Response]:', {
    status: response.status,
    data: response.data,
  });
});

export default apiClient;
