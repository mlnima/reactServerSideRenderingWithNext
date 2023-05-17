import { io } from "socket.io-client";
//@ts-ignore
const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL);

export  default socket;