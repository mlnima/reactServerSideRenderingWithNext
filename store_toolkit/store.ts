import {AnyAction, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import postsSlice from "./clientReducers/postsReducer";
import widgetsSlice from "./clientReducers/widgetsReducer";
import settingsSlice from "./clientReducers/settingsReducer";
import userSlice from "./clientReducers/userReducer";
import globalStateSlice from "./clientReducers/globalStateReducer";
import chatroomSlice from "./clientReducers/chatroomReducer";
// import adminPanelGlobalStateSlice from "./adminReducers/adminPanelGlobalStateReducer";
// import adminPanelSettingsSlice from "./adminReducers/adminPanelSettingsReducer";
// import adminPanelPostsSlice from "./adminReducers/adminPanelPostsReducer";
// import adminPanelWidgetsSlice from "./adminReducers/adminWidgetsReducer";
// import adminPanelFormsSlice from "./adminReducers/adminPanelFormsReducer";
// import adminPanelFileManagerSlice from "./adminReducers/adminPanelFileManagerReducer";
// import adminPanelPagesSlice from "./adminReducers/adminPanelPagesReducer";
// import adminPanelUsersSlice from "./adminReducers/adminPanelUsersReducer";
// import adminPanelCommentsSlice from "./adminReducers/adminCommentsReducer";
// import adminTerminalSlice from "./adminReducers/adminTerminalReducer";
import {adminPanelOrdersReducer} from "./adminReducers/adminPanelOrdersReducer";

const debugDev = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_PRODUCTION_URL.includes(':3000')
const debug = false;

const combinedReducer = combineReducers({
    settings: settingsSlice,
    user: userSlice,
    widgets: widgetsSlice,
    globalState: globalStateSlice,
    chatroom: chatroomSlice,
    posts: postsSlice,
    // adminPanelUsers: adminPanelUsersSlice,
    // adminPanelPages: adminPanelPagesSlice,
    // adminPanelGlobalState: adminPanelGlobalStateSlice,
    // adminPanelSettings: adminPanelSettingsSlice,
    // adminPanelPosts: adminPanelPostsSlice,
    // adminPanelWidgets: adminPanelWidgetsSlice,
    // adminPanelForms: adminPanelFormsSlice,
    // adminPanelFileManager: adminPanelFileManagerSlice,
    // adminPanelComments: adminPanelCommentsSlice,
    // adminPanelTerminalState: adminTerminalSlice
});


const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {

    if (action.type === HYDRATE ) {

        const nextState = {
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
                ...state?.user,
                // loggedIn:state?.user?.loggedIn || action?.payload?.user?.loggedIn
            },
            settings: {
                ...(action?.payload?.settings || {}),
                identity: {
                    ...(state?.settings?.identity || {}),
                    ...(action?.payload?.settings?.identity || {})

                },
                design: {
                    ...(state?.settings?.design || {}),
                    ...(action?.payload?.settings?.design || {})
                }
            },
        }

        return nextState
    } else {

        return combinedReducer(state, action);
    }

};

export const makeStore = () => configureStore({
    reducer,
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

