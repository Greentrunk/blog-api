import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    comments: [],
    status: 'idle',
    error: null
};

export const fetchComments = createAsyncThunk('comments/fetchComments', async post => {
    const response = await axios.get('http://localhost:5000/posts/comments/all', post);
    return response.data;
});

export const addNewComment = createAsyncThunk('comments/addNewComment', async comment => {
    const response = await axios.post('http://localhost:5000/posts/comments/new', comment);
    return response.data;
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = state.comments.concat(action.payload);
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewComment.fulfilled, (state, action) => {
                state.comments.push(action.payload)
            })
    }
});

export default commentsSlice.reducer;

export const selectComments = state => state.comments.comments;

export const selectAllCommentsForPost = (state, postId) => state.comments.comments.filter(comment => comment.post === postId);