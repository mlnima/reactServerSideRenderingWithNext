import {AnyAction, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
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
    adminPanelUsers: adminPanelUsersSlice,
    adminPanelPages: adminPanelPagesSlice,
    adminPanelGlobalState: adminPanelGlobalStateSlice,
    adminPanelSettings: adminPanelSettingsSlice,
    adminPanelPosts: adminPanelPostsSlice,
    adminPanelWidgets: adminPanelWidgetsSlice,
    adminPanelForms: adminPanelFormsSlice,
    adminPanelFileManager: adminPanelFileManagerSlice,
    adminPanelComments: adminPanelCommentsSlice,
    adminPanelTerminalState: adminTerminalSlice
});


const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {

    // if (action.type === HYDRATE) {
    //     const nextState = {
    //         ...state,
    //         ...action.payload,
    //         user: {
    //             ...(action?.payload?.user || {}),
    //             //@ts-ignore
    //             userData: state?.user?.userData || action?.payload?.user?.userData || {}
    //         }
    //     }
    //     return nextState
    // } else {
    //     return combinedReducer(state, action);
    // }
    console.log(action)

    return combinedReducer(state, action);
};

export const makeStore = () => configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    // devTools: true,
});

//@ts-ignore
type Store = ReturnType<typeof makeStore>;

export type AdminDispatch = Store['dispatch'];
//@ts-ignore
export type RootAdminState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootAdminState,
    unknown,
    Action<string>>;

export const wrapper = createWrapper<Store>(makeStore, {debug});



