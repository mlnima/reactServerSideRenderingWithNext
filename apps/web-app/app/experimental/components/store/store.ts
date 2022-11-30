import {AnyAction, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import postsSlice from "@store_toolkit/clientReducers/postsReducer";
import widgetsSlice from "@store_toolkit/clientReducers/widgetsReducer";
import settingsSlice from "@store_toolkit/clientReducers/settingsReducer";
import userSlice from "@store_toolkit/clientReducers/userReducer";
import globalStateSlice from "@store_toolkit/clientReducers/globalStateReducer";
import chatroomSlice from "@store_toolkit/clientReducers/chatroomReducer";

const combinedReducer = combineReducers({
    settings: settingsSlice,
    user: userSlice,
    widgets: widgetsSlice,
    globalState: globalStateSlice,
    chatroom: chatroomSlice,
    posts: postsSlice,
});


export const store = configureStore({
    reducer: combinedReducer,
});



// export const store = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
//     return combinedReducer(state, action);
// }