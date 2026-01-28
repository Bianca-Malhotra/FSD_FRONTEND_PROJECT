
import { configureStore } from '@reduxjs/toolkit';
import moodReducer from '../features/mood/moodSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    mood: moodReducer,
    auth: authReducer,
  },
});
