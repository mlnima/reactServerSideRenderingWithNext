import {AnyAction, combineReducers, configureStore, ThunkAction,} from '@reduxjs/toolkit';
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

//



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
                    ...action.payload, // empty store structure, we will inject necessary data from previous state to avoid extra fetch
                    user: {
                        ...(action.payload.user || {}),
                        //@ts-ignore
                        userData: state.user?.userData || {}
                    }
                }
        return nextState
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () => configureStore({
    reducer,
    // devTools: process.env.NODE_ENV !== 'production'
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

// export const store = configureStore({
//     reducer: {

//         // adminPanelPosts:adminPanelPostsReducer,
//   xxxx      // adminPanelSettings:adminPanelSettingsReducer,
//         // adminPanelFileManager:adminPanelFileManagerReducer,
//         // adminPanelWidgets:adminPanelWidgetsReducer,
//         // adminPanelForms:adminPanelFormsReducer,
//         // adminPanelOrders:adminPanelOrdersReducer,
//         // adminPanelPages:adminPanelPagesReducer,
//         // adminPanelComments:adminPanelCommentsReducer,
//         // adminPanelUsers:adminPanelUsersReducer,
//  xxxx       // adminPanelGlobalState:adminPanelGlobalStateReducer,
//         // adminPanelTerminalState:adminTerminalReducer
//     },
//     // middleware: (getDefaultMiddleware) =>
//         // getDefaultMiddleware().concat(pokemonApi.middleware),
// })
//
//
// // Infer the `RootState` and `AppDispatch` types from the store itself
// //@ts-ignore
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

