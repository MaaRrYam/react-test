import {configureStore} from '@reduxjs/toolkit';

import authSlice from '@/store/features/authSlice';
import loadingSlice from '@/store/features/loadingSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
