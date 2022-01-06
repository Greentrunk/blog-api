import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import loginReducer from '../features/auth/loginSlice';

const reducers = combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
    login: loginReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export default store;