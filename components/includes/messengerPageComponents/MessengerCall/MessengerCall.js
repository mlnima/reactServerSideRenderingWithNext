import React, {useEffect, useState, useContext, useRef} from 'react';

const MessengerCall = ({callerData,myVideoRef,userVideoRef,state,callEnded,stream,callAccepted,receivingCall,answerCall,}) => {

    useEffect(() => {
        console.log(callerData)
    }, [callerData]);

    return (
        <div className='messenger-call'>
        <style jsx>{`
        .messenger-call{
        position: fixed;
        width: 100%;
         // top: 0;
         // left: 0;
         // right: 0;
         // bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        }
        
        .messenger-call-elements{
        background-color: rgba(0,0,0,.5);
        }
        .messenger-call-my-video{
        width: 50vw;
        position: fixed;
        top: 80px;
        left: 0;
        }
        .messenger-call-user-video{
                width: 50vw;
         position: fixed;
         right: 0;
          top: 80px;
        }
        .messenger-call-user-calling-message{
      background-color: white;
        color: black;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        }
        `}</style>
            <div className='messenger-call-elements'>
                {state.displayMyVideo ? <video className='messenger-call-my-video' playsInline muted ref={myVideoRef} autoPlay /> : null}
                {callAccepted ? <video className='messenger-call-user-video' playsInline muted ref={userVideoRef} autoPlay /> : null}
                {receivingCall && !callAccepted ? <div className='messenger-call-user-calling-message'>
                    <h1>{callerData.callerName || callerData.callerId } is calling you</h1>
                    <button onClick={answerCall}>Accept</button>
                </div>:null}
            </div>

        </div>
    );
};
export default MessengerCall;
