import 'module-alias/register';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';

connectToDatabase('Socket Server')
import http from 'http'
import express from 'express'
import cors from 'cors'
import {chatroomSchema, messengerConversationMessageSchema, messengerConversationSchema, userSchema} from 'models'
import {uniqArrayBy} from "custom-util";
import chatroomMessageSchema from "models/src/chatroomMessageSchema";


const app = express();
const server = http.createServer(app);

app.use(cors())

let onlineUsers = []
let chatroomsList = []

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

app.get('/', (req, res) => {
    res.send(`server running on ${process.env.SOCKET_SERVER_PORT}`)
});
app.get('/*', (req, res) => {
    res.end()
});
app.post('/*', (req, res) => {
    res.end()
});

//@ts-ignore
server.listen(process.env.SOCKET_SERVER_PORT || 3005, (error) => {
    console.log(`process ${process.pid} : socket server is running at ${process.env.SOCKET_SERVER_PORT}`);
});

const creatNewMessage = async (messageData) => {
    try {
        const messageToSave = new chatroomMessageSchema(messageData)
        return await messageToSave.save()
    } catch (error) {
        console.log(error)
    }
}

chatroomSchema.find({}).select('_id').exec().then(async (chatrooms) => {
    chatroomsList = chatrooms.reduce((final, current) => {
        final = [...final, current._id.toString()]
        return final
    }, [])
})


io.on('connection', socket => {

    //Common
    socket.on("disconnect", async () => {
        try {
            onlineUsers = onlineUsers.filter(u => u.socketId !== socket.id)
            for await(const chatroom of chatroomsList) {
                io.in(chatroom.toString()).emit('userListUpdated', onlineUsers)
            }
        } catch (err) {
            console.log(err)
        }
    })

    socket.on('giveSocketsList', () => {
        socket.emit('takeSocketLists', (io.sockets?.server?.engine?.clientsCount || 1) - 1)
    })


    //Messenger

    // socket.on('setIdAndJoinConversation', async (userID, conversationId) => {
    //     socket.join(conversationId)
    // })

    socket.on('joinConversation', conversation => {
        console.log('console=> ', socket.id, 'joined to ', conversation)
        socket.join(conversation)
    })

    socket.on('sendPrivateMessage', async (messageData) => {

        try {
            const messageToSave = new messengerConversationMessageSchema(messageData)
            const savedMessage = await messageToSave.save()

            if (savedMessage){
               await messengerConversationSchema.findByIdAndUpdate(messageData.conversation, {$push:{messages:savedMessage._id}})
               io.in(messageData.conversation).emit('getPrivateMessage', savedMessage)
            }

        } catch (error) {

        }


    })


//Chatroom

    //step1
    socket.on('JoinSocketAndGetInitialData', async ({chatroomId}) => {
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
            console.log(error);
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
            console.log(error)
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
        } catch (err) {
            console.log(err)
        }
    });

    socket.on('startTyping', (chatroomId, username) => {
        socket.to(chatroomId).emit('startTyping', {username, activeChatroomId: chatroomId})
    });

})

// ----------------------videoCall---------------------


// socket.on("callUser", (data) => {
//     socket.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
// })
//
// socket.on("callToConversation", data => {
//     // socket.to(data.conversation).emit("callToConversation", { callerStreamData: data.callerStreamData, callerId: data.callerId, callerName: data.callerName,conversation:data.conversation })
//     socket.to(data.conversation).emit("incomingCallFromConversation", data)
// })
//
// socket.on("answerCall", (data) => {
//     socket.to(data.conversation).emit('callAccepted', data.signal)
// })
//
// socket.on('endCall', conversation => {
//     socket.to(conversation).emit('endCall')
// })