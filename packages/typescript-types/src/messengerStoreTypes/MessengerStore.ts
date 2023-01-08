import {UsersState} from "../dashboardStoreTypes/UsersState";
import {SettingsState} from "../dashboardStoreTypes/SettingsState";
import {GlobalState} from "../dashboardStoreTypes/GlobalState";

export interface MessengerStore{
    globalState: GlobalState;
    settings: SettingsState;
    users: UsersState;
}