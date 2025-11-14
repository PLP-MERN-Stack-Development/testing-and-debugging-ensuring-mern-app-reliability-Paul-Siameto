import reducer, { addPost, clearPosts, fetchPosts } from '../../state/postsSlice';

describe('postsSlice reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      items: [],
      status: 'idle',
      error: null,
    });
  });

  it('should add a post', () => {
    const post = { id: '1', title: 'Test', content: 'Hello', category: 'news' };
    expect(
      reducer(
        { items: [], status: 'idle', error: null },
        addPost(post),
      ),
    ).toEqual({
      items: [post],
      status: 'idle',
      error: null,
    });
  });

  it('should clear posts', () => {
    const initial = {
      items: [{ id: '1', title: 'Test', content: 'Hello', category: 'news' }],
      status: 'idle',
      error: null,
    };
    expect(reducer(initial, clearPosts())).toEqual({
      items: [],
      status: 'idle',
      error: null,
    });
  });

  it('should set loading on fetch pending', () => {
    const action = { type: fetchPosts.pending.type };
    expect(reducer(undefined, action).status).toBe('loading');
  });

  it('should store posts on fetch fulfilled', () => {
    const posts = [{ id: '1', title: 'Fetched', content: '...', category: 'news' }];
    const action = { type: fetchPosts.fulfilled.type, payload: posts };
    expect(reducer(undefined, action)).toMatchObject({
      status: 'succeeded',
      items: posts,
    });
  });

  it('should handle fetch rejected', () => {
    const action = {
      type: fetchPosts.rejected.type,
      error: { message: 'Failed' },
    };
    expect(reducer(undefined, action)).toMatchObject({
      status: 'failed',
      error: 'Failed',
    });
  });
});

