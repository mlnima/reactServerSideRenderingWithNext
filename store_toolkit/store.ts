import {AnyAction, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import postsSlice from "./clientReducers/postsReducer";
import widgetsSlice from "./clientReducers/widgetsReducer";
import settingsSlice from "./clientReducers/settingsReducer";
import userSlice from "./clientReducers/userReducer";
import globalStateSlice from "./clientReducers/globalStateReducer";
import chatroomSlice from "./clientReducers/chatroomReducer";
import adminPanelGlobalStateSlice from "./adminReducers/adminPanelGlobalStateReducer";
import adminPanelSettingsSlice from "./adminReducers/adminPanelSettingsReducer";
import adminPanelPostsSlice from "./adminReducers/adminPanelPostsReducer";
import adminPanelWidgetsSlice from "./adminReducers/adminWidgetsReducer";
import adminPanelFormsSlice from "./adminReducers/adminPanelFormsReducer";
import adminPanelFileManagerSlice from "./adminReducers/adminPanelFileManagerReducer";
import adminPanelPagesSlice from "./adminReducers/adminPanelPagesReducer";
import adminPanelUsersSlice from "./adminReducers/adminPanelUsersReducer";
import adminPanelCommentsSlice from "./adminReducers/adminCommentsReducer";
import adminTerminalSlice from "./adminReducers/adminTerminalReducer";
// import {adminPanelOrdersReducer} from "./adminReducers/adminPanelOrdersReducer";

const debug = false

const combinedReducer = combineReducers({
    settings: settingsSlice,
    user: userSlice,
    widgets: widgetsSlice,
    globalState: globalStateSlice,
    chatroom: chatroomSlice,
    posts: postsSlice,
    adminPanelUsers:adminPanelUsersSlice,
    adminPanelPages:adminPanelPagesSlice,
    adminPanelGlobalState: adminPanelGlobalStateSlice,
    adminPanelSettings:adminPanelSettingsSlice,
    adminPanelPosts:adminPanelPostsSlice,
    adminPanelWidgets:adminPanelWidgetsSlice,
    adminPanelForms:adminPanelFormsSlice,
    adminPanelFileManager:adminPanelFileManagerSlice,
    adminPanelComments:adminPanelCommentsSlice,
    adminPanelTerminalState:adminTerminalSlice
});


const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {

        if (action.type === HYDRATE) {
            const nextState = {
                ...state,
                ...action.payload,
                user:{
                    ...(action?.payload?.user || {}),
                    //@ts-ignore
                    userData:  state?.user?.userData || action?.payload?.user?.userData || {}
                },
                widgets:{
                    ...(action?.payload?.widgets || {}),
                    widgetInGroups:{
                        ...(action?.payload?.widgets?.widgetInGroups  || {}),
                        ...(state?.widgets?.widgetInGroups || {})
                    },
                    requestedWidgets:[
                        ...new Set([
                            ...(action?.payload?.widgets?.requestedWidgets || []),
                            ...(state?.widgets?.requestedWidgets || [])
                        ])

                    ]
                },
                settings:{
                    ...(action?.payload?.settings || {}),
                    identity:{
                        ...(action?.payload?.settings?.identity  || {}),
                        ...(state?.settings?.identity || {} )
                    },
                    design:{
                        ...(action?.payload?.settings?.design || {}),
                        ...(state?.settings?.identity || {})
                    }
                },
            }

            return  nextState
        } else {
            return combinedReducer(state, action);
        }
};

export const makeStore = () => configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
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



