import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from '@store/modules/user';

const reducers = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: reducers,
});
