import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import FirebaseService from '@/services/Firebase';
import {UserInterface} from '@/interfaces';
import {DocumentData} from 'firebase/firestore';
import StorageService from '@/services/Storage';
import { getUID } from '@/utils/functions';

interface AuthState {
  user: UserInterface;
  token: string | null;
}

// Thunks
export const getUser = createAsyncThunk<UserInterface, void>(
  'auth/getUser',
  async (_, {rejectWithValue}) => {
    try {
      const UID = (await StorageService.getItem('uid')) as string;
      const user = await FirebaseService.getDocument('users', UID);
      return user || ({} as UserInterface); // Return an empty object if user is falsy
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const listenToUserData = createAsyncThunk<
  void,
  void,
  {
    rejectValue: Error;
  }
>('auth/listenToUserData', async (_, {rejectWithValue, dispatch}) => {
  try {
    const UID = await getUID();
    if (!UID) {
      throw new Error('UID not found');
    }

    let unsubscribe: () => void;
    // Define the callback function to handle updates to user data
    const handleUserDataUpdate = (document: DocumentData | null) => {
      if (document) {
        const userData: UserInterface | null = document as UserInterface;
        if (userData) {
          dispatch(updateUserData(userData));
        }
      }
    };

    // Start listening to the user document and store the unsubscribe function
    unsubscribe = await FirebaseService.listenToDocument(
      'users',
      UID,
      handleUserDataUpdate,
    );

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

// Slice
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
