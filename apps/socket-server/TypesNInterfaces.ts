export interface ILoadOlderMessages{
    chatroomId:string,
    currentlyLoadedMessagesCount:number
}

export type ChatroomMap = {
    [key: string]: any; // Or replace 'any' with a more specific type if you have one for a chatroom.
};