import {AnyAction, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import postsSlice from "./clientReducers/postsReducers/postsReducer";
import widgetsSlice from "./clientReducers/widgetsReducer";
import settingsSlice from "./clientReducers/settingsReducer";
import userSlice from "./clientReducers/userReducers/userReducer";
import globalStateSlice from "./clientReducers/globalStateReducer";
import chatroomSlice from "./clientReducers/chatroomReducer";
import messengerSlice from "@store_toolkit/clientReducers/messengerReducer";
import mediaConnectionSlice from "@store_toolkit/clientReducers/mediaConnectionReducer";
// import {mediaStreamMiddleware} from "@store_toolkit/middlewares/mediaStreamMiddleware";
//@ts-ignore
const debugDev = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_PRODUCTION_URL.includes(':3000')
const debug = false;

const combinedReducer = combineReducers({
    mediaConnection:mediaConnectionSlice,
    messenger:messengerSlice,
    settings: settingsSlice,
    user: userSlice,
    widgets: widgetsSlice,
    globalState: globalStateSlice,
    chatroom: chatroomSlice,
    posts: postsSlice,
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {

    if (action.type === HYDRATE ) {
        return {
            ...state,
            ...action.payload,
            widgets: {
                widgetInGroups: {
                    ...(state?.widgets?.widgetInGroups || {}),
                    ...(action?.payload?.widgets?.widgetInGroups || {})
                },
                requestedWidgets: [
                    ...new Set([
                        ...(state?.widgets?.requestedWidgets || []),
                        ...(action?.payload?.widgets?.requestedWidgets || [])
                    ])
                ]
            },
            user: {
                ...action?.payload?.user,
                //@ts-ignore
                ...state?.user
            },
            settings: {
                ...(action?.payload?.settings || {}),
                initialSettings: {
                    ...(state?.settings?.initialSettings || {}),
                    ...(action?.payload?.settings?.initialSettings || {})
                }
            },
        }



    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () => configureStore({
    reducer,
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(mediaStreamMiddleware),
    devTools: debugDev,
});

//@ts-ignore
type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
//@ts-ignore
export type RootState = ReturnType<Store['getState']>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

export const wrapper = createWrapper<Store>(makeStore, {debug});

export default wrapper

