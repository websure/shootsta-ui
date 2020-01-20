/* 
  Custom hook for async data fetching.
  Handles all fetching states like : error, data, loading
*/
import React, { useState } from "react";
const useAsync = () => {
  const [data, setData] = useState<object>({});
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const reset = () => {
    setError(false);
    setLoading(false);
    setData({});
  };

  const fetch = (async: () => Promise<any>) => {
    setLoading(true);
    async()
      .then((res: any) => {
        if (res) {
          setData(res.data);
        }
      })
      .catch((e: object) => setError(true))
      .finally(() => setLoading(false));
  };

  return { fetch, loading, data, reset, error };
};

export default useAsync;
