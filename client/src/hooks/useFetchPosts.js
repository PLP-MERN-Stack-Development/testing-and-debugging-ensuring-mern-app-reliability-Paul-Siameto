import { useEffect, useState, useCallback } from 'react';

const defaultFetcher = async () => {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

export function useFetchPosts(fetcher = defaultFetcher) {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    error: null,
  });

  const loadPosts = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetcher();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: [], isLoading: false, error });
    }
  }, [fetcher]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return { ...state, refetch: loadPosts };
}

export default useFetchPosts;

