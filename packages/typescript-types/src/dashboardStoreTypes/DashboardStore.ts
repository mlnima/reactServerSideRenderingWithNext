import {CommentsState} from "./CommentsState";
import {UsersState} from "./UsersState";
import {PostsState} from "./PostsState";
import {FileManagerState} from "./FileManagerState";
import {SettingsState} from "./SettingsState";
import {FormsState} from "./FormsState";
import {PagesState} from "./PagesState";
import {OrdersState} from "./OrdersState";
import {TerminalState} from "./TerminalState";
import {GlobalState} from "./GlobalState";
import {WidgetsState} from "./WidgetsState";
import {ChatroomsState} from "./ChatroomsState";


export interface DashboardStore{
    comments: CommentsState;
    chatrooms: ChatroomsState;
    users: UsersState;
    posts: PostsState;
    fileManager: FileManagerState;
    settings: SettingsState;
    forms: FormsState;
    pages: PagesState;
    orders: OrdersState;
    terminal: TerminalState;
    globalState: GlobalState;
    widgets:WidgetsState
}