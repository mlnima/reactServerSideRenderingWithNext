import { io } from "socket.io-client";

// export const socket =  io()

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
    transports: ['websocket'],
    path: '/socket'
});

//process.env.NEXT_PUBLIC_SOCKET_SERVER_URL