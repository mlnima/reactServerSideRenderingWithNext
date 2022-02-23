import {combineReducers} from "redux";
import {postsReducer} from "./clientReducers/postsReducer";
import {userReducer} from "./clientReducers/userReducer";
import {widgetsReducer} from "./clientReducers/widgetsReducer";
import {globalStateReducer} from "./clientReducers/globalStateReducer";
import {settingsReducer} from "./clientReducers/settingsReducer";
import {chatroomReducer} from "./clientReducers/chatroomReducer";
import {adminPanelGlobalStateReducer} from "./adminReducers/adminPanelGlobalStateReducer";
import {adminPanelPostsReducer} from "./adminReducers/adminPanelPostsReducer";
import {adminPanelUsersReducer} from "./adminReducers/adminPanelUsersReducer";
import {adminTerminalReducer} from "./adminReducers/adminTerminalReducer";

export default combineReducers({
    adminPanelPosts:adminPanelPostsReducer,
    adminPanelUsers:adminPanelUsersReducer,
    adminPanelGlobalState:adminPanelGlobalStateReducer,
    adminPanelTerminalState:adminTerminalReducer,
    chatroom:chatroomReducer,
    settings:settingsReducer,
    posts:postsReducer,
    user:userReducer,
    widgets:widgetsReducer,
    globalState:globalStateReducer
})