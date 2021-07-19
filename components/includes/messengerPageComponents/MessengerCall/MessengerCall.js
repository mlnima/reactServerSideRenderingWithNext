import React, {useEffect, useState, useContext, useRef} from 'react';

const MessengerCall = ({userVideo,partnerVideo,stream,callAccepted,receivingCall,caller,acceptCall}) => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='messenger-call'>
            <style jsx>{`
.

             `}</style>
            {stream?<video playsInline muted ref={userVideo} autoPlay />:null}
            {callAccepted?<video playsInline muted ref={partnerVideo} autoPlay />:null}
            {receivingCall? <div>
                <h1>{caller} is calling you</h1>
                <button onClick={acceptCall}>Accept</button>
            </div>:null}
        </div>
    );
};
export default MessengerCall;
