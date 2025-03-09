import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import commentsSlice from './reducers/commentsReducer';
import fileManagerSlice from './reducers/fileManagerReducer';
import formsSlice from './reducers/formsReducer';
import globalStateSlice from './reducers/globalStateReducer';
import pagesSlice from './reducers/pagesReducer';
import postsSlice from './reducers/postsReducer';
import settingsSlice from './reducers/settingsReducer';
import terminalSlice from './reducers/terminalReducer';
import usersSlice from './reducers/usersReducer';
import widgetsSlice from './reducers/widgetsReducer';
import chatroomsSlice from './reducers/chatroomsReducer';

const combinedReducer = combineReducers({
  comments: commentsSlice,
  chatrooms: chatroomsSlice,
  fileManager: fileManagerSlice,
  forms: formsSlice,
  globalState: globalStateSlice,
  users: usersSlice,
  pages: pagesSlice,
  settings: settingsSlice,
  posts: postsSlice,
  widgets: widgetsSlice,
  terminal: terminalSlice,
});

export const store = configureStore({
  reducer: combinedReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<typeof combinedReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
