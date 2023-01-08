import {User} from "typescript-types";

export interface UsersState {
    isUserLoggedIn: boolean;
    userData: User,
    totalCount: number;
    user: User
}