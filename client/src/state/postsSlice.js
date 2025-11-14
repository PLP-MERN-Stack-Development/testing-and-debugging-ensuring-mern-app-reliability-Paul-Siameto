import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    clearPosts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;

