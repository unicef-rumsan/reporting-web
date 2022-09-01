import { useState } from 'react';

export default (apiFunc, { defaultDataState } = { defaultDataState: null }) => {
  const [data, setData] = useState(defaultDataState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setError(null);
      setData(result.data.data);
    } catch (err) {
      setError(err.message || 'Unexpected Error!');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};
