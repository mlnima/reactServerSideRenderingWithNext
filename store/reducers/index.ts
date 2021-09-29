import {combineReducers} from "redux";
import {postReducer} from "./postReducer";
import {userReducer} from "./userReducer";
import {widgetsReducer} from "./widgetsReducer";
import {globalStateReducer} from "./globalStateReducer";
import {settingsReducer} from "./settingsReducer";

export default combineReducers({
    settings:settingsReducer,
    posts:postReducer,
    user:userReducer,
    widgets:widgetsReducer,
    globalState:globalStateReducer
})