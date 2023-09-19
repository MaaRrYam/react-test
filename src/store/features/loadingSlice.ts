import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: state => {
      state.isLoading = true;
    },
    setLoadingFinished: state => {
      state.isLoading = false;
    },
  },
});

export const {setLoading, setLoadingFinished} = loadingSlice.actions;

export default loadingSlice.reducer;
