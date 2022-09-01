import {GlobalState} from "@_typeScriptTypes/storeTypes/GlobalState";
import {AdminPanelPosts} from "@_typeScriptTypes/storeTypes/AdminPanelPosts";
import {AdminPanelFileManager} from "@_typeScriptTypes/storeTypes/AdminPanelFileManager";
import {AdminPanelSettings} from "@_typeScriptTypes/storeTypes/AdminPanelSettings";
import {AdminPanelComments} from "@_typeScriptTypes/storeTypes/AdminPanelComments";
import {AdminPanelForms} from "@_typeScriptTypes/storeTypes/AdminPanelForms";
import {AdminPanelPages} from "@_typeScriptTypes/storeTypes/AdminPanelPages";
import {AdminPanelOrders} from "@_typeScriptTypes/storeTypes/AdminPanelOrders";
import {AdminPanelTerminalState} from "@_typeScriptTypes/storeTypes/AdminPanelTerminalState";
import {ChatroomState} from "@_typeScriptTypes/storeTypes/ChatroomState";
import {SettingsState} from "@_typeScriptTypes/storeTypes/SettingsState";
import {PostStateTypes} from "@_typeScriptTypes/storeTypes/PostsState";
import {UserState} from "@_typeScriptTypes/storeTypes/UserState";
import {WidgetsState} from "@_typeScriptTypes/storeTypes/WidgetsState";
import {AdminPanelWidgets} from "@_typeScriptTypes/storeTypes/AdminPanelWidgets";
import {AdminPanelGlobalState} from "@_typeScriptTypes/storeTypes/AdminPanelGlobalState";
import {AdminPanelUsersState} from "@_typeScriptTypes/storeTypes/AdminPanelUsers";

export interface Store {
    adminPanelComments: AdminPanelComments;
    adminPanelSettings: AdminPanelSettings;
    adminPanelFileManager: AdminPanelFileManager;
    adminPanelForms: AdminPanelForms;
    adminPanelPages: AdminPanelPages;
    adminPanelOrders: AdminPanelOrders;
    adminPanelUsers: AdminPanelUsersState,
    adminPanelGlobalState: AdminPanelGlobalState,
    adminPanelPosts: AdminPanelPosts,
    adminPanelTerminalState: AdminPanelTerminalState,
    adminPanelWidgets: AdminPanelWidgets,
    chatroom: ChatroomState,
    settings: SettingsState,
    posts: PostStateTypes,
    user: UserState,
    widgets: WidgetsState,
    globalState: GlobalState,
}