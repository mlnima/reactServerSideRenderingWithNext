import {combineReducers} from "redux";
import {postReducer} from "./postReducer";
import {userReducer} from "./userReducer";
import {widgetsReducer} from "./widgetsReducer";
import {globalStateReducer} from "./globalStateReducer";


export default combineReducers({
    posts:postReducer,
    user:userReducer,
    widgets:widgetsReducer,
    globalState:globalStateReducer
})