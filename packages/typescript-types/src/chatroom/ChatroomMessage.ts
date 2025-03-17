import { User } from '../User';

export interface ChatroomMessage {
  _id: string,
  chatroom: string,
  author: User,
  type: string,
  messageData: string,
  createdAt: Date,
  updatedAt: Date,
}
