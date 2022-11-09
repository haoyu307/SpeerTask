import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentUserName: '',
  currentFollowers: 0,
  currentFollowings: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserName = action.payload;
    },
    setCurrentFollowers: (state, action) => {
      state.currentFollowers = action.payload;
    },
    setCurrentFollowings: (state, action) => {
      state.currentFollowings = action.payload;
    },
  },
});

export const {setCurrentUser, setCurrentFollowers, setCurrentFollowings} =
  userSlice.actions;

export default userSlice.reducer;
