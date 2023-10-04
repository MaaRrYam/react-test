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

export const getAllChats = createAsyncThunk('chats/getAllChats', async () => {
  const result = (await ChatsService.getAllChats()) as ChatsInterface[];
  return result;
});

export const getAllUsers = createAsyncThunk('chats/getAllUsers', async () => {
  const result = (await ChatsService.getAllUsers()) as UserInterface[];
  return result;
});

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    refetchChats(state) {
      state.isChatsFetched = false;
    },
    addNewChat(state, {payload}: {payload: ChatsInterface}) {
      state.chats = [payload, ...state.chats];
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllChats.fulfilled, (state, {payload}) => {
      state.chats = payload;
      state.isChatsFetched = true;
      state.isChatsFirstRequest = false;
    });
    builder.addCase(getAllUsers.fulfilled, (state, {payload}) => {
      state.users = payload;
      state.isUsersFetched = true;
    });
  },
});

export const {refetchChats, addNewChat} = chatsSlice.actions;

export default chatsSlice.reducer;
