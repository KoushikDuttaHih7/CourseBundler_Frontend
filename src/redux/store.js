import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

export const server = 'https://coursebundler-server-encx.onrender.com/api/v1';
