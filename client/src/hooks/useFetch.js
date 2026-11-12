import { useCallback, useEffect, useState } from 'react';

/**
 * Minimal data-fetching hook for the async service functions.
 * Returns { data, loading, error, reload }. `fn` should be a stable reference
 * (e.g. imported from a service module) that resolves to the unwrapped payload.
 */
export function useFetch(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(result);
    } catch (e) {
      setError(e?.friendlyMessage || e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, reload: run };
}

export default useFetch;
