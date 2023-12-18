import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import FirebaseService from '@/services/Firebase';
import {UserInterface} from '@/interfaces';
import StorageService from '@/services/Storage';

interface AuthState {
  user: UserInterface;
  token: string | null;
}

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const UID = (await StorageService.getItem('uid')) as string;
  const user = await FirebaseService.getDocument('users', UID);
  return (user || {}) as UserInterface;
});

const initialState: AuthState = {
  user: {} as UserInterface,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{token: string; user: UserInterface}>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOut: state => {
      state.token = null;
      state.user = {} as UserInterface;
    },
    updateUserData: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload;
    },
    addUser: (
      state,
      action: PayloadAction<{token: string; user: UserInterface}>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {logIn, logOut, updateUserData, addUser} = authSlice.actions;
export default authSlice.reducer;
