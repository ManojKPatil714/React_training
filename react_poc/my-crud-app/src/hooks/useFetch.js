import { useState, useEffect, useCallback } from 'react';

// In-memory cache shared across components
const cache = new Map();

/**
 * A custom React Hook for fetching data with caching.
 * @param {string} url - The URL to fetch data from
 * @returns {{ data: any, loading: boolean, error: string|null, refetch: function }}
 */
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Encapsulate fetch logic in a callback
  const fetchData = useCallback(async (skipCache = false) => {
    if (!skipCache && cache.has(url)) {
      setData(cache.get(url));
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      cache.set(url, result);
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the data.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
