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
import {adminPanelCommentsReducer} from "./adminReducers/adminCommentsReducer";
import {adminPanelFormsReducer} from "./adminReducers/adminPanelFormsReducer";
import {adminPanelPagesReducer} from "./adminReducers/adminPanelPagesReducer";
import {adminPanelOrdersReducer} from "./adminReducers/adminPanelOrdersReducer";
import {adminPanelWidgetsReducer} from "./adminReducers/adminWidgetsReducer";
import {adminPanelSettingsReducer} from "./adminReducers/adminPanelSettingsReducer";
import {adminPanelFileManagerReducer} from "@store/adminReducers/adminPanelFileManagerReducer";

//NOT IN USE
export default combineReducers({
    chatroom:chatroomReducer,
    settings:settingsReducer,
    posts:postsReducer,
    user:userReducer,
    widgets:widgetsReducer,
    globalState:globalStateReducer,
    adminPanelPosts:adminPanelPostsReducer,
    adminPanelSettings:adminPanelSettingsReducer,
    adminPanelFileManager:adminPanelFileManagerReducer,
    adminPanelWidgets:adminPanelWidgetsReducer,
    adminPanelForms:adminPanelFormsReducer,
    adminPanelOrders:adminPanelOrdersReducer,
    adminPanelPages:adminPanelPagesReducer,
    adminPanelComments:adminPanelCommentsReducer,
    adminPanelUsers:adminPanelUsersReducer,
    adminPanelGlobalState:adminPanelGlobalStateReducer,
    adminPanelTerminalState:adminTerminalReducer
})