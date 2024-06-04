export class UserModel {
    id: string;
    socketId: string;
    name: string;
    profileImage?: string;
    currentChatroomId?: string;

    constructor(id: string, socketId: string, name: string, profileImage?: string) {
        this.id = id;
        this.socketId = socketId;
        this.name = name;
        this.profileImage = profileImage;
    }
}