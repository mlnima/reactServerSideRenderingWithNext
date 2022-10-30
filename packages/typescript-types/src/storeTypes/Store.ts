import {GlobalState} from "./GlobalState";
import {AdminPanelPosts} from "./AdminPanelPosts";
import {AdminPanelFileManager} from "./AdminPanelFileManager";
import {AdminPanelSettings} from "./AdminPanelSettings";
import {AdminPanelComments} from "./AdminPanelComments";
import {AdminPanelForms} from "./AdminPanelForms";
import {AdminPanelPages} from "./AdminPanelPages";
import {AdminPanelOrders} from "./AdminPanelOrders";
import {AdminPanelTerminalState} from "./AdminPanelTerminalState";
import {ChatroomState} from "./ChatroomState";
import {SettingsState} from "./SettingsState";
import {PostStateTypes} from "./PostsState";
import {UserState} from "./UserState";
import {WidgetsState} from "./WidgetsState";
import {AdminPanelWidgets} from "./AdminPanelWidgets";
import {AdminPanelGlobalState} from "./AdminPanelGlobalState";
import {AdminPanelUsersState} from "./AdminPanelUsers";

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
    settings?: SettingsState,
    posts: PostStateTypes,
    user: UserState,
    widgets: WidgetsState,
    globalState: GlobalState,
}