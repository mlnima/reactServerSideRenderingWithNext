export interface IPreference{
    autoScroll: boolean;
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

export interface IDraftMessage {
    imageContent: string,
    videoContent: string,
    audioContent: string,
    textContent: string,
}