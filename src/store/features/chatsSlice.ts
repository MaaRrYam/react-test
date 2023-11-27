import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {ChatsInterface, UserInterface} from '@/interfaces';
import ChatsService from '@/services/chats';

const initialState = {
  chats: [] as ChatsInterface[],
  isChatsFetched: false,
  isChatsFirstRequest: true,
  users: [] as UserInterface[],
  isUsersFetched: false,
};

export const getAllUsers = createAsyncThunk('chats/getAllUsers', async () => {
  const result = (await ChatsService.getAllUsers()) as UserInterface[];
  return result;
});

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatsToStore(state, {payload}: {payload: ChatsInterface[]}) {
      state.isChatsFetched = true;
      state.isChatsFirstRequest = false;
      state.chats = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllUsers.fulfilled, (state, {payload}) => {
      state.users = payload;
      state.isUsersFetched = true;
    });
  },
});

export const {setChatsToStore} = chatsSlice.actions;

export default chatsSlice.reducer;
