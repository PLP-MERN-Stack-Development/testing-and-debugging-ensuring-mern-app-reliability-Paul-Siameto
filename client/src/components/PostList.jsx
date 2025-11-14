import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function PostList({ posts, onRefresh, isLoading }) {
  if (isLoading) {
    return <p aria-live="polite">Loading posts...</p>;
  }

  if (!posts.length) {
    return (
      <div>
        <p>No posts available. Try adding one!</p>
        <Button onClick={onRefresh} variant="secondary">
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <section aria-label="Posts">
      <header className="post-list__header">
        <h2>Posts ({posts.length})</h2>
        <Button onClick={onRefresh} variant="secondary">
          Refresh
        </Button>
      </header>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-list__item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>Category: {post.category}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ),
  onRefresh: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

PostList.defaultProps = {
  posts: [],
  isLoading: false,
};

export default PostList;

