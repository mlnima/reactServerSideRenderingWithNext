import {ChatroomMessage} from "typescript-types/dist/src/Chatroom/ChatroomMessage";
import {IChatroomUsers, TChatroomUser} from "web-application/app/[lang]/messenger/components/interfaces";

class Store {
    private onlineUsers: { [chatroomId: string]: IChatroomUsers } = {};
    private chatroomsList: Array<{ _id: string, name: string, messages: Array<ChatroomMessage> }> = [];
    private activeSockets: Map<string, any> = new Map();

    userDisconnectedHandler(userId: string): void {
        for (const onlineUsersInChatroom in this.onlineUsers) {
            this.onlineUsers[onlineUsersInChatroom] = this.onlineUsers[onlineUsersInChatroom].filter(user => user._id !== userId);
        }
    }

    getOnlineUsersForChatroom(chatroomId: string): Array<any> {
        return this.onlineUsers[chatroomId] || [];
    }

    getChatroomsList(): Array<any> {
        return this.chatroomsList;
    }

    getChatroomNames(): Array<{ _id: string, name: string }> {
        return this.chatroomsList.map(chatroom => ({
            _id: chatroom._id,
            name: chatroom.name
        }));
    }

    getChatroomById(chatroomId: string): { _id: string, messages: Array<any> } | undefined {
        return this.chatroomsList.find(chatroom => chatroom._id === chatroomId);
    }

    getChatroomMessagesById(chatroomId: string): ChatroomMessage[] | undefined {
        const findChatroom = this.chatroomsList.find(chatroom => chatroom._id.toString() === chatroomId);
        return findChatroom?.messages;
    }

    getActiveSockets(): Map<string, any> {
        return this.activeSockets;
    }

    getUserIDBySocketID(socketId: string): string {
        for (let [key, value] of this.activeSockets.entries()) {
            if (value === socketId) {
                return key;
            }
        }
    }

    addOnlineUserToChatroom(chatroomId: string, user: TChatroomUser): boolean {
        if (!this.onlineUsers[chatroomId]) {
            this.onlineUsers[chatroomId] = [];
        }
        const userExists = this.onlineUsers[chatroomId].some(existingUser => existingUser._id === user._id);
        if (!userExists) {
            this.onlineUsers[chatroomId].push(user);
        }
        return userExists
    }



    setChatroomsList(chatrooms: Array<{ _id: string, name: string, messages: Array<any> }>): void {
        this.chatroomsList = chatrooms;
    }


    addMessageToChatroom(newMessageData): void {
        const chatroom = this.chatroomsList.find(chatroom => chatroom._id.toString() === newMessageData.chatroom.toString());

        if (!!chatroom?._id) {
            chatroom.messages.push(newMessageData);
        }
    }

    addActiveSocket(socketId: string, value: any): void {
        this.activeSockets.set(socketId, value);
    }

    removeActiveSocket(socketId: string): void {
        this.activeSockets.delete(socketId);
    }

    removeMessageFromChatroom(chatroomId: string, messageId: string): void  {
        const chatroom = this.chatroomsList.find(chatroom => chatroom._id.toString() === chatroomId);
        if (!!chatroom?._id) {
            chatroom.messages = chatroom.messages.filter(message => message._id.toString() !== messageId);
        }
    }

    removeOnlineUserFromChatroom(chatroomId: string, userId: string): void {
        if (this.onlineUsers?.[chatroomId]) {
            this.onlineUsers[chatroomId] = this.onlineUsers[chatroomId].filter(user => user._id !== userId);
        }
    }
}

export default new Store();
