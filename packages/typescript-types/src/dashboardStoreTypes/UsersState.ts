import {User} from "@repo/typescript-types";

export interface UsersState {
    isUserLoggedIn: boolean;
    userData: User,
    totalCount: number;
    users: User[];
    user: User
}