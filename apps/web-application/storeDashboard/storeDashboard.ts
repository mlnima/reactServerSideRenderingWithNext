// @ts-nocheck
import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import fileManagerSlice from './reducers/fileManagerReducer';
import globalStateSlice from './reducers/globalStateReducer';
import postsSlice from './reducers/postsReducer';
import settingsSlice from './reducers/settingsReducer';

import widgetsSlice from './reducers/widgetsReducer';

const combinedReducer = combineReducers({
  fileManager: fileManagerSlice,
  globalState: globalStateSlice,
  settings: settingsSlice,
  posts: postsSlice,
  widgets: widgetsSlice,
});

export const store = configureStore({
  reducer: combinedReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<typeof combinedReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
