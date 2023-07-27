// @ts-nocheck
import {AnyAction, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import postsSlice from "./reducers/postsReducers/postsReducer";
import widgetsSlice from "./reducers/widgetsReducer";
import settingsSlice from "./reducers/settingsReducer";
import userSlice from "./reducers/userReducers/userReducer";
import globalStateSlice from "./reducers/globalStateReducer";
import chatroomSlice from "./reducers/chatroomReducer";
import messengerSlice from "./reducers/messengerReducer";
import mediaConnectionSlice from "./reducers/mediaConnectionReducer";
const devTools = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_PRODUCTION_URL?.includes(':3000')


const combinedReducer = combineReducers({
    mediaConnection: mediaConnectionSlice,
    messenger: messengerSlice,
    settings: settingsSlice,
    user: userSlice,
    widgets: widgetsSlice,
    globalState: globalStateSlice,
    chatroom: chatroomSlice,
    posts: postsSlice,
});

export const store = configureStore({
    reducer: combinedReducer,
    devTools
});

export type AppDispatch = typeof store.dispatch;
// @ts-ignore
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

