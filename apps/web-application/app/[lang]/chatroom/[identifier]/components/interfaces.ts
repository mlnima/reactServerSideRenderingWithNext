export interface IPreference{
    autoScroll: boolean;
    onlineUserListVisibility: boolean;
    isJoined: boolean;
    isMaximized: boolean;
}
export type TChatroomUser={
    username: string,
    id: string,
    profileImage: {
        filePath: string
    },
}

export type IChatroomUsers=TChatroomUser[]

