import {UserModel} from "./UserModel";

export class ChatroomModel {
    id: string;
    name: string;
    users: UserModel[] = [];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    addUser(user: UserModel) {
        this.users.push(user);
        user.currentChatroomId = this.id;
    }

    removeUser(user: UserModel) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}