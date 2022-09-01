import {User} from "@_typeScriptTypes/User";

export interface AdminPanelUsersState {
    loggedIn: boolean;
    userData: {
        role: string;
    },
    totalCount: number;
    users: User[];
    user: User
}