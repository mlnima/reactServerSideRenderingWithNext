import { User } from "typescript-types";
export interface AdminPanelUsersState {
    loggedIn: boolean;
    userData: {
        role: string;
    };
    totalCount: number;
    users: User[];
    user: User;
}
//# sourceMappingURL=AdminPanelUsers.d.ts.map