import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import NotificationService from '@/services/notifications';
import {NotificationInterface} from '@/interfaces';

const initialState = {
  notifications: [] as NotificationInterface[],
  isNotificationsFetched: false,
  isNotificationsFirstRequest: true,
};

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async () => {
    const result = await NotificationService.getAllNotifications();
    return result;
  },
);

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    removeNotification(state, {payload}: {payload: string}) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(getNotifications.fulfilled, (state, {payload}) => {
      state.notifications = payload;
      state.isNotificationsFetched = true;
      state.isNotificationsFirstRequest = false;
    });
  },
});

export const {removeNotification} = notificationsSlice.actions;

export default notificationsSlice.reducer;
