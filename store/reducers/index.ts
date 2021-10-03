import {combineReducers} from "redux";
import {postReducer} from "./postReducer";
import {userReducer} from "./userReducer";
import {widgetsReducer} from "./widgetsReducer";
import {globalStateReducer} from "./globalStateReducer";
import {settingsReducer} from "./settingsReducer";
import {chatroomReducer} from "./chatroomReducer";

export default combineReducers({
    chatroom:chatroomReducer,
    settings:settingsReducer,
    posts:postReducer,
    user:userReducer,
    widgets:widgetsReducer,
    globalState:globalStateReducer
})