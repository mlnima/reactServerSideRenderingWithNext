import {IMessengerConversationMessage} from "../messengerTypes/IMessengerConversationMessage";
import {IMessengerConversation} from "../messengerTypes/IMessengerConversation";

export interface MessengerState {
    conversationsList: IMessengerConversationMessage[],
    activeConversation?: IMessengerConversation,
    isMaximized:boolean,
    autoScroll:boolean,
    isConversationsMenuOpen:boolean,
}