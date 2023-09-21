import FirebaseService from '@/services/Firebase';
import StorageService from '@/services/Storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User} from 'firebase/auth';

const initialState = {
  user: {},
  token: null,
};

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const UID = (await StorageService.getItem('uid')) as string;
  const user = await FirebaseService.getDocument('users', UID);
  if (user) {
    console.log(user);
    return user;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      state.token = null;
      state.user = {};
      StorageService.nuke();
    },
    addUser: (state, {payload}) => {
      state.token = payload.token;
      state.user = payload.user;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, {payload}) => {
      state.user = payload;
    });
  },
});

export const {logOut, addUser} = authSlice.actions;

export default authSlice.reducer;
