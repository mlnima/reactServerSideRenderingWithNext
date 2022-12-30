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


export interface DashboardStore{
    comments: CommentsState;
    users: UsersState;
    posts: PostsState;
    fileManager: FileManagerState;
    settings: SettingsState;
    forms: FormsState;
    pages: PagesState;
    orders: OrdersState;
    Terminal: TerminalState;
    globalState: GlobalState;
    widgets:WidgetsState
}