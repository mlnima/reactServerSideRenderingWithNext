// import io from 'socket.io-client';
// export const wSocket = process.env.REACT_APP_SOCKET === 'true' ?  io(process.env.REACT_APP_PRODUCTION_URL.replace(process.env.REACT_APP_PORT, parseInt(process.env.REACT_APP_PORT) + 1)) : null;

// webSocket.on('connect',cb=>{
//     console.log(cb.id)
// })



export const socketOnConnect = (socket) =>{
    console.log(socket.id)
}