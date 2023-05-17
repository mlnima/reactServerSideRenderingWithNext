import React, { useEffect, useState } from 'react';
import { socket } from 'custom-util';

const ActiveSockets = () => {
    const [activeSockets, setActiveSockets] = useState([]);

    useEffect(() => {
        socket.emit('giveSocketsList');

        socket.on('takeSocketLists', (sockets) => {
            setActiveSockets(sockets);
        });

        return () => {
            socket.off('takeSocketLists');
        };
    }, []);

    return (
        <div>
            {activeSockets?.length &&
            <>
                <h2>Active Sockets:</h2>
                <ul>
                    {activeSockets.map((socketId) => (
                        <li key={socketId}>{socketId}</li>
                    ))}
                </ul>
            </>
            }

        </div>
    );
};

export default ActiveSockets;