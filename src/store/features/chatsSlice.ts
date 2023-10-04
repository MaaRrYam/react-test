import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {ChatsInterface} from '@/interfaces';
import ChatsService from '@/services/chats';

const initialState = {
  chats: [] as ChatsInterface[],
  isChatsFetched: false,
  isChatsFirstRequest: true,
};

export const getAllChats = createAsyncThunk('chats/getAllChats', async () => {
  const result = (await ChatsService.getAllChats()) as ChatsInterface[];
  return result;
});

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    refetchChats(state) {
      state.isChatsFetched = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllChats.fulfilled, (state, {payload}) => {
      state.chats = payload;
      state.isChatsFetched = true;
      state.isChatsFirstRequest = false;
    });
  },
});

export const {refetchChats} = chatsSlice.actions;

export default chatsSlice.reducer;
