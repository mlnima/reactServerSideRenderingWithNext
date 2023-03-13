// @ts-nocheck
import React, {useRef, useEffect} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import Draggable from 'react-draggable';
import {Store} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {faPhoneSlash} from "@fortawesome/free-solid-svg-icons/faPhoneSlash";

const MessengerCallStyledDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  .messenger-call-user-calling-message-ringing {
    z-index: 20;
    margin: auto;
    text-align: center;
    position: absolute;
    top: 50px;
    color: var(--main-text-color, #fff);
  }


  .messenger-call-elements {
    background-color: rgba(0, 0, 0, .5);

    .messenger-call-my-video-small {
      position: absolute;
      top: 50px;
      right: 10px;
      display: block;
      width: 25vw;
      min-width: 100px;
      height: calc(25vw * 1.777);
      min-height: 150px;
      object-fit: cover;
      transform: rotateY(180deg);
      z-index: 1003;
      resize: both;
    }

    .messenger-call-my-video-big, .messenger-call-user-video {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100vw;
      height: 100vh;
      object-fit: contain;
      transform: rotateY(180deg);
      z-index: 1002;
      resize: both;
    }

    //.messenger-call-user-video {
    // // width: 50vw;
    ////  position: fixed;
    ////  right: 0;
    // // top: 80px;
    //  z-index: 1002;
    //}

    .messenger-call-user-calling-message {
      display: flex;
      flex-direction: column;
      padding: 5px 10px;
      align-items: flex-start;
      background-color: var(--secondary-background-color, #181818);
      color: var(--main-text-color, #fff);
      position: absolute;
      top: 5px;
      left: 0;
      right: 0;
      border-radius: 20px;
      width: 90%;
      margin: auto;
      z-index: 1004;

      .messenger-call-user-calling-message-username, .messenger-call-user-calling-message-call-type {
        margin: 5px;
      }

      .messenger-call-user-calling-message-answer-buttons {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 90%;
        z-index: 1001;

        .messenger-call-user-calling-message-answer-button, .messenger-call-user-calling-message-reject-button {
          background-color: transparent;
          color: var(--main-text-color, #fff);
          padding: 10px 20px;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .messenger-call-actions-buttons {
      //opacity: .5;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      position: absolute;
      width: 100%;
      max-width: 300px;
      height: 50px;
      padding: 5px 10px;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1004;
      .leave-call-button {
        background-color: red;
        color: white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        outline: none;
        border: none;
        //margin: 30px 0;
      }

      .switch-camera-button, .disable-video-button, .disable-audio-button {
        background-color: transparent;
        color: white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        outline: none;
        border: none;
        margin: 0;
      }
    }


  }

`

const MessengerCall = ({endCallHandler, callAccepted, attemptForAnswer, disableMicrophone, disableCamera, answerCall}) => {
    const callData = useSelector((store:Store) => store.user.callData);
    const myVideoRef = useRef(null)
    const userVideoRef = useRef(null)

    useEffect(() => {
        callData?.myVideo && myVideoRef.current ?
            myVideoRef.current.srcObject = callData?.myVideo :
            //@ts-ignore
            callData?.myStream && myVideoRef.current  ?
                userVideoRef.current.src = window.URL.createObjectURL(callData?.myVideo) :
                null;
    }, [callData.myVideo]);

    useEffect(() => {
        callData?.partnerVideo && userVideoRef.current ?
            userVideoRef.current.srcObject = callData?.partnerVideo :
            callData?.partnerVideo && userVideoRef.current ?
                userVideoRef.current.src = window.URL.createObjectURL(callData?.partnerVideo) :
                null;
    }, [callData.partnerVideo]);



    if (callData.calling || callData.receivingCall|| callData.callAccepted) {
        return (
            <MessengerCallStyledDiv className='messenger-call'>
                {callData.calling && !callAccepted ? <p className='messenger-call-user-calling-message-ringing'>Ringing....</p> : null}
                <div className='messenger-call-elements'>
                    <Draggable handle=".my-video">
                        <video className={`my-video messenger-call-my-video-${callAccepted ? 'small' : 'big'}`} playsInline muted ref={myVideoRef} autoPlay/>
                    </Draggable>
                    {callData.callAccepted && callData?.partnerVideo ?
                        <Draggable handle=".messenger-call-user-video">
                             <video className='messenger-call-user-video' playsInline ref={userVideoRef} autoPlay/>
                        </Draggable>
                        : null}
                    {callData.receivingCall && !callData.callAccepted ?
                        <div className='messenger-call-user-calling-message'>
                            <p className='messenger-call-user-calling-message-username'>{callData.callerName}</p>
                            <p className='messenger-call-user-calling-message-call-type'>Incoming video call</p>
                            <div className='messenger-call-user-calling-message-answer-buttons'>
                                <button className='messenger-call-user-calling-message-answer-button' onClick={answerCall}>
                                    <FontAwesomeIcon icon={faPhone} style={{width:20,height:20}}/>
                                </button>
                                <button className='messenger-call-user-calling-message-reject-button' onClick={endCallHandler}>
                                    <FontAwesomeIcon icon={faPhoneSlash} style={{width:20,height:20}}/>
                                </button>
                            </div>

                        </div> : null}
                    {callData.receivingCall && callData.callAccepted || callData.calling ? <div className='messenger-call-actions-buttons '>
                        {/*<button onClick={switchCameraHandler} className='switch-camera-button'></button>*/}
                        {/*<button onClick={disableCamera} className='disable-video-button'></button>*/}
                        {/*<button onClick={disableMicrophone} className='disable-audio-button'> </button>*/}
                        <button onClick={endCallHandler} className='leave-call-button'>
                            <FontAwesomeIcon icon={faPhoneSlash} style={{width:20,height:20}}/>
                        </button>
                    </div> : null}
                </div>
            </MessengerCallStyledDiv>
        );
    } else return null

};
export default MessengerCall;
