import {combineReducers} from "redux";
import {postReducer} from "./reducers/postReducer";
import {userReducer} from "./reducers/userReducer";
import {widgetsReducer} from "./reducers/widgetsReducer";
import {globalStateReducer} from "./reducers/globalStateReducer";
import {settingsReducer} from "./reducers/settingsReducer";
import {chatroomReducer} from "./reducers/chatroomReducer";
import {adminPanelGlobalStateReducer} from "./adminReducers/adminPanelGlobalStateReducer";
import {adminPanelPostsReducer} from "./adminReducers/adminPanelPostsReducer";

export default combineReducers({
    adminPanelPosts:adminPanelPostsReducer,
    adminPanelGlobalState:adminPanelGlobalStateReducer,
    chatroom:chatroomReducer,
    settings:settingsReducer,
    posts:postReducer,
    user:userReducer,
    widgets:widgetsReducer,
    globalState:globalStateReducer
})