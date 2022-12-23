import {CommentsState} from "./Comments";
import {UsersState} from "./Users";
import {PostsState} from "./Posts";
import {FileManagerState} from "./FileManager";
import {SettingsState} from "./Settings";
import {FormsState} from "./Forms";
import {PagesState} from "./Pages";
import {OrdersState} from "./Orders";
import {TerminalState} from "./TerminalState";
import {GlobalState} from "./GlobalState";


export interface DashboardStore{
    comments: CommentsState;
    users: UsersState;
    post: PostsState;
    fileManager: FileManagerState;
    settings: SettingsState;
    forms: FormsState;
    pages: PagesState;
    orders: OrdersState;
    Terminal: TerminalState;
    globalState: GlobalState;
}