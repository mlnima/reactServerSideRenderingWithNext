import {combineReducers} from "redux";
import {postReducer} from "./postReducer";
import {userReducer} from "./userReducer";
import {widgetsReducer} from "./widgetsReducer";
import {globalStateReducer} from "./globalStateReducer";
import {settingsReducer} from "./settingsReducer";
import {chatroomReducer} from "./chatroomReducer";
import {adminPanelGlobalStateReducer} from "./adminPanelGlobalStateReducer";
import {adminPanelPostsReducer} from "./adminPanelPostsReducer";

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