import { useState } from 'react';

export default useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunction(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data);
    return response;
  };
  return { data, error, loading, request };
};
