import {createSlice, createAsyncThunk, createSelector, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('http://localhost:5000/posts');
    return response.data;
});

export const newPost = createAsyncThunk('posts/newPost', async (post, token) => {
    console.log(post, token)
    const response = await axios.post(`http://localhost:5000/secure/posts?secret_token=${token}`, post);
    console.log( response)
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = state.posts.concat(action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(newPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
    }
});

export default postsSlice.reducer;

export const selectAllPosts = state => state.posts.posts;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post._id === postId);
