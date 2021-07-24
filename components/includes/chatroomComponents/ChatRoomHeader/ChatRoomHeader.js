import React, {useEffect, useState, useContext, useRef} from 'react';

const ChatRoomHeader = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <header className='chatroom-header'>
            <style jsx>{`
            .chatroom-header{
              background-color: var(--navigation-background-color);
              height: 33px;
            }
            
            
            `}</style>
        </header>
    );
};
export default ChatRoomHeader;
