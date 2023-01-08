import { configureStore,combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import globalStateSlice from './reducers/globalStateReducer';
import settingsSlice from './reducers/settingsReducer';
import usersSlice from './reducers/usersReducer';

const combinedReducer = combineReducers({
  globalState: globalStateSlice,
  users: usersSlice,
  settings: settingsSlice,
})

export const store = configureStore({
  reducer: combinedReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
