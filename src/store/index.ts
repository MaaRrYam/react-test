import {configureStore} from '@reduxjs/toolkit';

import authSlice from '@/store/features/authSlice';
import loadingSlice from '@/store/features/loadingSlice';
import networkSlice from '@/store/features/networkSlice';
import notificationsSlice from '@/store/features/notificationsSlice';
import homeSlice from '@/store/features/homeSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    loading: loadingSlice,
    network: networkSlice,
    notifications: notificationsSlice,
    home: homeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
