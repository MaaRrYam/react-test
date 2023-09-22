import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import FirebaseService from '@/services/Firebase';
import StorageService from '@/services/Storage';
import {UserInterface} from '@/interfaces';

const initialState = {
  user: {} as UserInterface,
  token: null as string | null,
};

export const getUser = createAsyncThunk<UserInterface, void>(
  'auth/getUser',
  async (_, {rejectWithValue}) => {
    try {
      const UID = (await StorageService.getItem('uid')) as string;
      const user = await FirebaseService.getDocument('users', UID);
      if (user) {
        return user as UserInterface;
      }
      return {} as UserInterface;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      state.token = null;
      state.user = {} as UserInterface;
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
