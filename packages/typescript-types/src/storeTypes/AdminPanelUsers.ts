import {User} from "@repo/typescript-types";

export interface AdminPanelUsersState {
    loggedIn: boolean;
    userData: {
        role: string;
    },
    totalCount: number;
    users: User[];
    user: User
}