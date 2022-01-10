import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://atomic-blog.herokuapp.com/posts");
  return response.data;
});

export const newPost = createAsyncThunk("posts/newPost", async (body) => {
  const response = await axios.post(
    `https://atomic-blog.herokuapp.com/secure/posts?secret_token=${body.token}`,
    { post_title: body.post_title, post_text: body.post_text }
  );
  return response.data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (body) => {
  const response = await axios.delete(
    `https://atomic-blog.herokuapp.com/secure/posts/${body.postId}?secret_token=${body.token}`
  );
  return response.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePosts",
  async (body) => {
    const response = await axios.put(
      `https://atomic-blog.herokuapp.com/secure/posts/${body.postId}/update?secret_token=${body.token}`,
      { post_title: body.post_title, post_text: body.post_text }
    );
    return response.data;
  }
);

export const publishPost = createAsyncThunk(
  "posts/publishPost",
  async (body) => {
    const response = await axios.put(
      `https://atomic-blog.herokuapp.com/secure/posts/${body.postId}/publish?secret_token=${body.token}`
    );
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(newPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.posts.splice(index, 1);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.posts.splice(index, 1, action.payload);
      })
      .addCase(publishPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.posts.splice(index, 1, action.payload);
      });
  },
});

export default postsSlice.reducer;

export const selectAllPublishedPosts = (state) =>
  state.posts.posts.filter((post) => post.published === true);

export const selectAllUnpublishedPosts = (state) =>
  state.posts.posts.filter((post) => post.published === false);

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post._id === postId);
