import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (post) => {
    const response = await axios.get(
      "https://atomic-blog.herokuapp.com/posts/comments/all",
      post
    );
    return response.data;
  }
);

export const addNewComment = createAsyncThunk(
  "comments/addNewComment",
  async (comment) => {
    const response = await axios.post(
      "https://atomic-blog.herokuapp.com/posts/comments/new",
      comment
    );
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (body) => {
    const response = await axios.delete(
      `https://atomic-blog.herokuapp.com/secure/posts/${body.commentId}/comment?secret_token=${body.token}`
    );
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = state.comments.concat(action.payload);
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload._id
        );
        state.comments.splice(index, 1);
      });
  },
});

export default commentsSlice.reducer;

export const selectComments = (state) => state.comments.comments;

export const selectAllCommentsForPost = (state, postId) =>
  state.comments.comments.filter((comment) => comment.post === postId);
