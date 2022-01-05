import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import loginReducer from '../features/auth/loginSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer,
        login: loginReducer
    }
});