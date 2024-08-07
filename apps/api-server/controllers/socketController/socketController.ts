import Store from './store';
import { correctChatroomsMessages } from './correctChatroomsMessages';
import { ILoadOlderMessages } from '@repo/typescript-types';
import chatroomMessageSchema from '@schemas/chatroomMessageSchema';
import chatroomSchema from '@schemas/chatroomSchema';
import messengerConversationMessageSchema from '@schemas/messengerConversationMessageSchema';
import messengerConversationSchema from '@schemas/messengerConversationSchema';
import userSchema from '@schemas/userSchema';

export const initializeSocket = (io: any) => {
    io.on('connection', (socket: any) => {
        //----------------------------initializing socket----------------------------

        socket.on('initialLoggedInUserSocket', async ({ userId }) => {
            Store.addActiveSocket(userId, socket.id);
        });

        socket.on('ping', () => {
            Store.addActiveSocket(socket.id, Date.now());
        });

        socket.on('disconnect', async () => {
            const userId = Store.getUserIDBySocketID(socket.id);
            Store.userDisconnectedHandler(userId);
            io.emit('aUserDisconnected', userId);
        });

        //-----------------------------chatroom operations-----------------------------

        socket.on('iWantToJoinToAChatroom', async ({ chatroomId, joiner }) => {
            try {
                if (!!joiner?._id && !!chatroomId) {
                    socket.join(chatroomId);
                    const addUserToChatroomAndCheckIfExist = Store.addOnlineUserToChatroom(
                        chatroomId,
                        joiner,
                    );

                    const dataToSend = {
                        recentChatRoomMessages: Store.getChatroomMessagesById(chatroomId),
                        onlineUsersList: Store.getOnlineUsersForChatroom(chatroomId),
                    };

                    socket.emit('initializeChatroomData', dataToSend);
                    if (!addUserToChatroomAndCheckIfExist) {
                        socket.broadcast
                            .to(chatroomId)
                            .emit('newUserJoined', { joiner, chatroomId });
                    }
                }
            } catch (error) {
                console.log('error on joinUserToTheRoom => ', error);
            }
        });

        socket.on('iWantToPreviewAChatroom', async ({ chatroomId })=>{
            if (!!chatroomId){
                socket.join(chatroomId);
                const dataToSend = {
                    recentChatRoomMessages: Store.getChatroomMessagesById(chatroomId),
                    onlineUsersList: Store.getOnlineUsersForChatroom(chatroomId),
                };

                socket.emit('initializeChatroomData', dataToSend);
            }
        })

        socket.on('iAmTyping', (chatroomId: string, username: string) => {
            try {
                socket.broadcast.to(chatroomId).emit('someoneIsTyping', { username, chatroomId });
            } catch (error) {
                console.log('error on startTyping => ', error);
            }
        });

        socket.on('messageToChatroom', async newMessageData => {
            try {
                const messageToSave = new chatroomMessageSchema(newMessageData.messageBody);

                const savedMessage = await messageToSave.save();

                const normalizeSavedMessage = savedMessage.toObject();

                const messageToSetInStoreAndSendToClient = {
                    //issue
                    ...normalizeSavedMessage,
                    author: newMessageData.authorData,
                };

                await chatroomSchema.findByIdAndUpdate(
                    savedMessage.chatroom,
                    {
                        $addToSet: { messages: savedMessage._id },
                    },
                    { timestamps: false },
                );

                Store.addMessageToChatroom(messageToSetInStoreAndSendToClient);

                io.in(newMessageData.messageBody?.chatroom).emit(
                    'messageFromChatroom',
                    messageToSetInStoreAndSendToClient,
                );
            } catch (error) {
                console.log('error on messageToChatroom => ', error);
            }
        });

        socket.on('iLeftTheChatroom', async ({ chatroomId }) => {
            const userId = Store.getUserIDBySocketID(socket.id);
            Store.removeOnlineUserFromChatroom(chatroomId, userId);
            socket.broadcast.to(chatroomId).emit('aUserLeftTheChatroom', userId);
        });

        socket.on(
            'loadOlderMessages',
            async ({ chatroomId, currentlyLoadedMessagesCount }: ILoadOlderMessages) => {
                try {
                    if (currentlyLoadedMessagesCount < 100) {
                        const olderMessages = await chatroomMessageSchema
                            .find({ chatroom: chatroomId })
                            .populate({
                                path: 'author',
                                select: 'username profileImage',
                                model: userSchema,
                                populate: {
                                    path: 'profileImage',
                                    model: 'file',
                                },
                            })
                            .skip(currentlyLoadedMessagesCount + 1)
                            .sort({ createdAt: -1 })
                            .limit(5)
                            .exec();

                        io.to(socket.id).emit('olderMessagesLoaded', { messages: olderMessages });
                    } else {
                        io.to(socket.id).emit('olderMessagesLoaded', { messages: [] });
                    }
                } catch (error) {
                    console.log('error on loadOlderMessages => ', error);
                }
            },
        );

        socket.on('deleteThisMessageFromChatroom', ({ messageId, chatroomId }) => {
            try {
                chatroomMessageSchema.findByIdAndDelete(messageId).then(() => {
                    io.in(messageId).emit('messageDeletedFromChatroom');
                });
                chatroomSchema.findByIdAndUpdate(
                    chatroomId,
                    { $pull: { messages: messageId } },
                    { timestamps: false },
                );
                Store.removeMessageFromChatroom(chatroomId, messageId);
                io.in(chatroomId).emit('aMessageDeletedFromChatroom', messageId);
            } catch (error) {}
        });

        socket.on('correctChatroomsMessages', () => {
            correctChatroomsMessages();
        });

        socket.on('giveSocketsList', () => {
            socket.emit('takeSocketLists', Array.from(Store.getActiveSockets().values()));
        });

        //-----------------------------messenger operations-----------------------------

        socket.on('joinConversation', conversation => {
            socket.join(conversation);
        });

        socket.on('sendPrivateMessage', async messageData => {
            try {
                const messageToSave = new messengerConversationMessageSchema(messageData);
                const savedMessage = await messageToSave.save();
                if (savedMessage) {
                    await messengerConversationSchema.findByIdAndUpdate(messageData.conversation, {
                        $push: { messages: savedMessage._id },
                    });
                    io.in(messageData.conversation).emit('getPrivateMessage', savedMessage);
                }
            } catch (error) {
                console.log('error on sendPrivateMessage => ', error);
            }
        });

        //----------------------------media call operations----------------------------

        socket.on('makeMediaCall', ({ signal, targetSocketIds, callerData, callType, conversationId }) => {
                try {
                    for (const socketId of targetSocketIds) {
                        const initialSocketId = Store.getActiveSockets().get(socketId);
                        io.sockets
                            .to(initialSocketId)
                            .emit('incomingCallSocketEvent', {
                                signal,
                                callerData,
                                callType,
                                conversationId,
                            });
                    }
                } catch (error) {
                    console.log('error on makeMediaCall => ', error);
                }
            },);

        socket.on('callAccepted', ({ signal, _id }) => {
            try {
                const initialSocketId = Store.getActiveSockets().get(_id);
                io.sockets.to(initialSocketId).emit('callAccepted', { signal });
            } catch (error) {
                console.log('error on callAccepted => ', error);
            }
        });

        socket.on('callRejected', ({ _id }) => {
            try {
                const callerId = Store.getActiveSockets().get(_id);
                io.sockets.to(callerId).emit('callRejected');
            } catch (error) {
                console.log('error on callRejected => ', error);
            }
        });

        socket.on('callTerminated', ({ targetSocketIds }) => {
            try {
                for (const socketId of targetSocketIds) {
                    const initialSocketId = Store.getActiveSockets().get(socketId);
                    io.sockets.to(initialSocketId).emit('callTerminated');
                }
            } catch (error) {
                console.log('error on callTerminated => ', error);
            }
        });

        socket.on('cancelOutGoingCall', ({ targetSocketIds, conversationId, callerData }) => {
            try {
                for (const socketId of targetSocketIds) {
                    const initialSocketId = Store.getActiveSockets().get(socketId);
                    io.sockets
                        .to(initialSocketId)
                        .emit('cancelIncomingCall', { conversationId, callerData });
                }
            } catch (error) {
                console.log('error on callTerminated => ', error);
            }
        });
    });
};

// socket.on('JoinSocketAndGetInitialData', async ({ chatroomId }) => {
//     try {
//         const recentChatRoomMessages = await ChatroomMessageSchema
//             .find({ chatroom: chatroomId })
//             .populate({
//                 path: 'author',
//                 select: ['username', 'profileImage', 'role'],
//                 model: userSchema,
//                 populate: {
//                     path: 'profileImage',
//                     model: 'file',
//                 },
//             })
//             .sort({ createdAt: -1 })
//             .limit(10)
//             .exec();
//
//         const dataToSend = {
//             recentChatRoomMessages: recentChatRoomMessages || [],
//             onlineUsersList: GlobalStore.getOnlineUsers(),
//             socketId: socket.id
//         };
//
//
//         socket.join(chatroomId);
//         io.to(socket.id).emit('JoinSocketAndGetInitialData', dataToSend);
//     } catch (error) {
//         console.log('error on JoinSocketAndGetInitialData => ', error);
//     }
// });
