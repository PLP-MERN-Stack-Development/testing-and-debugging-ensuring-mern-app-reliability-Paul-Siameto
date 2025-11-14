import { renderHook, act, waitFor } from '@testing-library/react';
import { useFetchPosts } from '../../hooks/useFetchPosts';

describe('useFetchPosts', () => {
  it('fetches posts on mount', async () => {
    const fetcher = jest.fn().mockResolvedValue([{ id: '1', title: 'Hello' }]);

    const { result } = renderHook(() => useFetchPosts(fetcher));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(1);
  });

  it('handles fetch errors', async () => {
    const error = new Error('Network');
    const fetcher = jest.fn().mockRejectedValue(error);

    const { result } = renderHook(() => useFetchPosts(fetcher));

    await waitFor(() => expect(result.current.error).toBe(error));
  });

  it('exposes refetch helper', async () => {
    const fetcher = jest.fn().mockResolvedValue([]);
    const { result } = renderHook(() => useFetchPosts(fetcher));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.refetch();
    });

    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});

