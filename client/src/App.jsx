import React, { useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { useFetchPosts } from './hooks/useFetchPosts';

function App() {
  const { data: posts, isLoading, error, refetch } = useFetchPosts();

  const handleCreatePost = useCallback(
    async (payload) => {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      refetch();
    },
    [refetch],
  );

  return (
    <ErrorBoundary>
      <main>
        <h1>MERN Reliability Dashboard</h1>
        {error && (
          <div role="alert">
            <p>{error.message}</p>
            <button type="button" onClick={refetch}>
              Retry
            </button>
          </div>
        )}
        <PostForm onSubmit={handleCreatePost} />
        <PostList posts={posts} onRefresh={refetch} isLoading={isLoading} />
      </main>
    </ErrorBoundary>
  );
}

export default App;

