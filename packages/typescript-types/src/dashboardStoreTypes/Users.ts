import {User} from "typescript-types";

export interface UsersState {
    loggedIn: boolean;
    userData: {
        role: string;
    },
    totalCount: number;
    users: User[];
    user: User
}