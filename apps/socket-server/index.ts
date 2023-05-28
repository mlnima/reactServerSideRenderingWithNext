import 'module-alias/register';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});
import {connectToDatabase, createExpressServer} from 'custom-server-util';

connectToDatabase('Socket Server')
import express from 'express'
import cors from 'cors'
import {chatroomSchema, messengerConversationMessageSchema, messengerConversationSchema, userSchema,chatroomMessageSchema} from 'models'

import {uniqArrayBy} from "custom-util";
// const dev = process.env.NODE_ENV !== 'production';

// const certPath = dev ? '../../ssl/certificate.crt' : '../../../ssl/certificate.crt';
// const keyPath = dev ? '../../ssl/private.key' : '../../../ssl/private.key';


let onlineUsers = []
let chatroomsList = []
const runSocketServer = async () => {

    try {
        const app = express();
        const server = await createExpressServer(app);
        app.use(cors())


        app.get('/', (req, res) => {
            res.send(`server running on ${process.env.SOCKET_SERVER_PORT}`)
        });
        app.get('/*', (req, res) => {
            res.end()
        });
        app.post('/*', (req, res) => {
            res.end()
        });

        server.listen(process.env.SOCKET_SERVER_PORT || 3005, (error) => {
            console.log(`process ${process.pid} : socket server is running at ${process.env.SOCKET_SERVER_PORT}`);
        });

        const activeSockets = new Map();

        const io = require('socket.io')(server, {
            origin: [process.env.NEXT_PUBLIC_PRODUCTION_URL, '*'],
            cors: true,
            handlePreflightRequest: (req, res) => {
                res.writeHead(200, {
                    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_PRODUCTION_URL,
                    "Access-Control-Allow-Methods": "GET,POST",
                    "Access-Control-Allow-Headers": "my-custom-header",
                    "Access-Control-Allow-Credentials": true
                });
                res.end();
            }
        })


        chatroomSchema.find({}).select('_id').exec().then(async (chatrooms) => {
            chatroomsList = chatrooms.reduce((final, current) => {
                final = [...final, current._id.toString()]
                return final
            }, [])
        })
        const creatNewMessage = async (messageData) => {
            try {
                const messageToSave = new chatroomMessageSchema(messageData)
                return await messageToSave.save()
            } catch (error) {
                console.log(error)
            }
        }



        io.on('connection', socket => {

            activeSockets.set(socket.id, socket.id);

            socket.on('userSignedIn', async ({userId}) => {
                const initialSocketId = activeSockets.get(socket.id);
                activeSockets.delete(socket.id);
                activeSockets.set(userId, initialSocketId);
            });

            socket.on('ping', () => {
                activeSockets.set(socket.id, Date.now());
            });

            socket.on('giveSocketsList', () => {
                socket.emit('takeSocketLists', Array.from(activeSockets.values()));
            });

            socket.on('disconnect', async () => {
                onlineUsers = onlineUsers.filter(u => u.socketId !== socket.id)
                for await(const chatroom of chatroomsList) {
                    io.in(chatroom.toString()).emit('userListUpdated', onlineUsers)
                }
                io.emit('takeSocketLists', Array.from(activeSockets));
            });

            socket.on('joinConversation', conversation => {
                console.log('console=> ', socket.id, 'joined to ', conversation)
                socket.join(conversation)
            })

            socket.on('sendPrivateMessage', async (messageData) => {

                try {

                    const messageToSave = new messengerConversationMessageSchema(messageData)

                    const savedMessage = await messageToSave.save()

                    if (savedMessage) {
                        await messengerConversationSchema.findByIdAndUpdate(messageData.conversation, {$push: {messages: savedMessage._id}})
                        io.in(messageData.conversation).emit('getPrivateMessage', savedMessage)
                    }

                } catch (error) {
                    console.log('error on sendPrivateMessage => ', error)
                }


            })
            //step1
            socket.on('JoinSocketAndGetInitialData', async ({chatroomId}) => {
                try {
                    const recentChatRoomMessages = await chatroomMessageSchema
                        .find({chatroom: chatroomId})
                        .populate({
                            path: 'author',
                            select: ['username', 'profileImage', 'role'],
                            model: userSchema,
                            populate: {
                                path: 'profileImage',
                                model: 'file',
                            },
                        })
                        .sort({createdAt: -1})
                        .limit(10)
                        .exec();

                    const dataToSend = {
                        recentChatRoomMessages: recentChatRoomMessages || [],
                        onlineUsersList: onlineUsers,
                        socketId: socket.id
                    }
                    socket.join(chatroomId)
                    io.to(socket.id).emit('JoinSocketAndGetInitialData', dataToSend)
                } catch (error) {
                    console.log('error on JoinSocketAndGetInitialData => ', error)
                }

            });

            socket.on('loadOlderMessages', async data => {
                try {
                    const currentlyLoadedMessagesCount = data.currentlyLoadedMessagesCount;

                    const olderMessages = await chatroomMessageSchema
                        .find({chatroom: data.chatroomId})
                        .populate({
                            path: 'author',
                            select: 'username profileImage',
                            model: userSchema,
                            populate: {
                                path: 'profileImage',
                                model: 'file',
                            }
                        })
                        .skip(currentlyLoadedMessagesCount)
                        .sort({createdAt: -1})
                        .limit(5)
                        .exec();

                    io.to(socket.id).emit('olderMessagesLoaded', {messages: olderMessages});
                } catch (error) {
                    console.log('error on loadOlderMessages => ', error)
                }
            });

            //step2
            socket.on('joinUserToTheRoom', async userData => {
                try {
                    onlineUsers = uniqArrayBy([
                        ...onlineUsers,
                        {...userData.author, socketId: socket.id}
                    ], 'username');
                    io.in(userData.chatroomId).emit('userListUpdated', onlineUsers);
                } catch (error) {
                    console.log('error on joinUserToTheRoom => ', error)
                }
            });

            socket.on('messageToChatroom', async newMessageData => {

                try {
                    const chatroomMessagesCount = await chatroomMessageSchema.countDocuments({chatroom: newMessageData?.chatroom}).exec()
                    if (chatroomMessagesCount > 200) {
                        await chatroomMessageSchema.findOneAndDelete({chatroom: newMessageData?.chatroom}).sort('_id').exec()
                    }

                    const savedMessage = await creatNewMessage(newMessageData)
                    const savedMessageToReturn = await chatroomMessageSchema.findById(savedMessage).populate({
                        path: 'author',
                        select: ['username', 'profileImage', 'role'],
                        model: userSchema,
                        populate: {
                            path: 'profileImage',
                            model: 'file',
                        },
                    }).exec()
                    io.in(newMessageData?.chatroom).emit('messageFromChatroom', savedMessageToReturn)
                } catch (error) {
                    console.log('error on messageToChatroom => ', error)
                }
            });

            socket.on('startTyping', (chatroomId, username) => {
                try {
                    socket.to(chatroomId).emit('startTyping', {username, activeChatroomId: chatroomId})
                } catch (error) {
                    console.log('error on startTyping => ', error)
                }
            });

            socket.on('makeMediaCall', ({signal, targetSocketIds, callerData, callType,conversationId}) => {
                try {
                    for (const socketId of targetSocketIds) {
                        const initialSocketId = activeSockets.get(socketId);
                        io.sockets
                            .to(initialSocketId)
                            .emit("incomingCallSocketEvent", {signal, callerData, callType,conversationId});
                    }
                } catch (error) {
                    console.log('error on makeMediaCall => ', error)
                }
            });

            socket.on('callAccepted', ({signal, _id}) => {
                try {
                    const initialSocketId = activeSockets.get(_id);
                    console.log('initialSocketId=> ', initialSocketId)
                    io.sockets.to(initialSocketId).emit('callAccepted', {signal})
                } catch (error) {
                    console.log('error on callAccepted => ', error)
                }
            });

            socket.on('callRejected', ({_id}) => {
                try {
                    const callerId = activeSockets.get(_id);
                    console.log('initialSocketId=> ', callerId)
                    io.sockets.to(callerId).emit('callRejected')
                } catch (error) {
                    console.log('error on callRejected => ', error)
                }
            });

            socket.on('callTerminated', ({targetSocketIds}) => {
                try {
                    for (const socketId of targetSocketIds) {
                        const initialSocketId = activeSockets.get(socketId);
                        io.sockets.to(initialSocketId).emit('callTerminated')
                    }
                } catch (error) {
                    console.log('error on callTerminated => ', error)
                }
            });

            socket.on('cancelOutGoingCall', ({targetSocketIds,conversationId,callerData}) => {
                try {
                    for (const socketId of targetSocketIds) {
                        const initialSocketId = activeSockets.get(socketId);
                        io.sockets.to(initialSocketId).emit('cancelIncomingCall', {conversationId,callerData})
                    }
                } catch (error) {
                    console.log('error on callTerminated => ', error)
                }
            });
        })

    } catch (error) {
        console.log('error=> ', error)
    }
}

runSocketServer()

