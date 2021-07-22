import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneAlt, faPhoneSlash, faPowerOff, faSyncAlt, faVideoSlash, faVolumeMute} from "@fortawesome/free-solid-svg-icons";

const MessengerCall = ({callerData, myVideoRef, userVideoRef, state, endCallHandler, callAccepted, attemptForAnswer,}) => {

    if (state.calling || state.receivingCall ){
        return (
            <div className='messenger-call'>
                <style jsx>{`
        .messenger-call{
            position: fixed;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: black;
        }
        
        .messenger-call-elements{
            background-color: rgba(0,0,0,.5);
        }

        .messenger-call-user-video{
            width: 50vw;
            position: fixed;
            right: 0;
            top: 80px;
        }
        .messenger-call-user-calling-message{
            display: flex;
            flex-direction: column;
            padding: 5px 10px;
            align-items: flex-start;
            background-color: var(--navigation-background-color);
            color: var(--navigation-text-color);
            position: absolute;
            top: 5px;
            left:0;
            right:0;
            border-radius: 20px;
            width: 90%;
            margin:auto;
        }
        
        .messenger-call-user-calling-message-username,.messenger-call-user-calling-message-call-type{
        margin: 5px;
        }
        
        .messenger-call-user-calling-message-answer-buttons{
        display: flex;
        justify-content: space-evenly;
        align-items:center;
        width: 90%;
        }
        .messenger-call-user-calling-message-answer-button,.messenger-call-user-calling-message-reject-button{
         background-color: transparent;
         color:var(--navigation-text-color) ;
         padding: 10px 20px ;
         border: none;
        }
        
        
        
        .messenger-call-my-video-small{
            position: absolute;
            top :50px;
            right :10px;
            display :block;
            width :25vw;
            min-width :100px;
            height :calc(25vw * 1.777);
            min-height :150px;
           
            object-fit :cover;
            z-index: 12;
        } 
               
        .messenger-call-my-video-big,.messenger-call-user-video{
            position: absolute;
            top :0;
            left :0;
            display :block;
            width :100%;
            height :100%;
            object-fit :none;
           
        }
        
        .messenger-call-actions-buttons{
           display: flex;
           justify-content: center;
           flex-direction: column;
           align-items: center;
           flex-wrap: wrap;
            position: absolute;
            width: 100%;
            height: 300px;
            bottom: 0;
            left:0;
            right:0;
        }

        
        .leave-call-button{
            background-color: red ;
            color:white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            outline:none;
            border:none;
            margin: 30px 0;
        }
        
        .messenger-call-media-controls-buttons{
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            max-width: 300px;
        }
        
        .switch-camera-button,.disable-video-button,.disable-audio-button{
            background-color: transparent ;
            color:white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            outline:none;
            border:none;
            margin: 50px 0;
        }
        
        `}</style>
                <div className='messenger-call-elements'>
                    {state.calling || callAccepted  ? <video className={`messenger-call-my-video-${callAccepted ? 'small' : 'big'}`} playsInline muted ref={myVideoRef}  autoPlay/> : null}
                    {callAccepted? <video className='messenger-call-user-video' playsInline ref={userVideoRef} autoPlay/> : null}
                    {state.receivingCall && !callAccepted ? <div className='messenger-call-user-calling-message'>
                        <p className='messenger-call-user-calling-message-username'>{callerData.callerName}</p>
                        <p  className='messenger-call-user-calling-message-call-type'>Incoming video call</p>
                        <div className='messenger-call-user-calling-message-answer-buttons'>
                            <button className='messenger-call-user-calling-message-answer-button' onClick={attemptForAnswer}> <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faPhoneAlt} className=' svg-logo-small' /></button>
                            <button className='messenger-call-user-calling-message-reject-button' onClick={endCallHandler}> <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faPhoneSlash} className=' svg-logo-small' /></button>
                        </div>

                    </div> : null}
                    {state.receivingCall && callAccepted || state.calling ? <div className='messenger-call-actions-buttons '>
                        <button onClick={endCallHandler} className='leave-call-button'> <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faPhoneSlash} className=' svg-logo-small' /></button>
                        <div className='messenger-call-media-controls-buttons'>
                            <button onClick={endCallHandler} className='switch-camera-button'> <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faSyncAlt} className=' svg-logo-small' /></button>
                            <button onClick={endCallHandler} className='disable-video-button'> <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faVideoSlash} className=' svg-logo-small' /></button>
                            <button onClick={endCallHandler} className='disable-audio-button'> <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faVolumeMute} className=' svg-logo-small' /></button>
                        </div>

                    </div> : null}
                </div>
            </div>
        );
    }else return null

};
export default MessengerCall;
