import React, {FC, useEffect} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRepeat} from "@fortawesome/free-solid-svg-icons";
import {faVideoSlash} from "@fortawesome/free-solid-svg-icons/faVideoSlash";
import {faMicrophoneSlash} from "@fortawesome/free-solid-svg-icons/faMicrophoneSlash";
import {faPhoneSlash} from "@fortawesome/free-solid-svg-icons/faPhoneSlash";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {useAppSelector} from "@store_toolkit/hooks";

const Style = styled.div<{ incomingCall: boolean }>`
  display: flex;
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 10%;
  justify-content: space-evenly;
  align-items: center;
  padding: 4px;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(100%);
  transition: 1s all ease-in-out;


  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: none;
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
    100% {
      transform: scale(1);
      box-shadow: none;
    }
  }


  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .action-button{
    cursor: pointer;
    padding: 4px;
  }
  
  .call-button{
    background-color: #4BD963;
    color: white;
  }

  .switch-camera {

  }

  .disable-video {

  }

  .disable-audio {

  }

  .hangup {
    background-color: #FA0502;
    color: white;
  }

  .answer-call-button, .hangup {
    animation: ${({incomingCall}) => incomingCall ? 'pulse 2s infinite' : 'none'};
  }

`;

interface PropTypes {
    inCallButtonsVisible: boolean,
    onSwitchCameraHandler: () => void,
    onDisableCameraHandler: () => void,
    onRejectCallHandler: () => void,
    onCancelOutGoingCallHandler: () => void,
    onMuteCallHandler: () => void,
    onTerminatedCallHandler: () => void,
    onCallHandler: () => void,
    onAcceptCallHandler: () => void,
    setInCallButtonsVisible: (boolean) => void,
    InCallButtonsRef: any
    isCameraEnabled: boolean
}

const InCallActionButtons: FC<PropTypes> = (
    {
        inCallButtonsVisible,
        setInCallButtonsVisible,
        onRejectCallHandler,
        onCancelOutGoingCallHandler,
        onCallHandler,
        onSwitchCameraHandler,
        onDisableCameraHandler,
        onMuteCallHandler,
        onTerminatedCallHandler,
        onAcceptCallHandler,
        isCameraEnabled,
        InCallButtonsRef
    }) => {

    const {
        onGoingCall,
        outGoingCall,
        incomingCall,
        callAccepted,
        callType,
    } = useAppSelector(({mediaConnection}) => mediaConnection);

    useEffect(() => {
        if ((!outGoingCall || !incomingCall) && callAccepted) {

            const hideButtons = setTimeout(() => {
                setInCallButtonsVisible(false);
            }, 3000);

            return () => {
                clearTimeout(hideButtons);
            };
        }

    }, [inCallButtonsVisible]);


    const onRejectOrTerminateOrCancelOutGoingCallHandler = () => {
        if (onGoingCall) {
            onTerminatedCallHandler();
        }else if (outGoingCall){
            onCancelOutGoingCallHandler();
        } else {
            onRejectCallHandler();
        }
    }


    return (
        <Style incomingCall={incomingCall}
               className={`in-call-actions-buttons ${inCallButtonsVisible ? 'visible' : ''}`}
               ref={InCallButtonsRef}>

            {onGoingCall &&
                <>
                    <button onClick={onSwitchCameraHandler} className={'switch-camera action-button'}>
                        <FontAwesomeIcon icon={faRepeat} style={{width: 25, height: 25}}/>
                    </button>
                    <button onClick={onDisableCameraHandler} className={'disable-video action-button'}>
                        <FontAwesomeIcon icon={isCameraEnabled ? faVideoSlash : faVideo} style={{width: 25, height: 25}}/>
                    </button>
                    <button onClick={onMuteCallHandler} className={'disable-audio action-button'}>
                        <FontAwesomeIcon icon={faMicrophoneSlash} style={{width: 25, height: 25}}/>
                    </button>
                </>
            }
            {(incomingCall && !callAccepted) &&
                <button onClick={onAcceptCallHandler} className={'answer-call-button action-button'}>
                    <FontAwesomeIcon icon={callType === 'video' ? faVideo : faPhone}
                                     style={{width: 20, height: 20}}/>
                </button>
            }

            {(onGoingCall || incomingCall || outGoingCall) && <button onClick={onRejectOrTerminateOrCancelOutGoingCallHandler} className={'hangup action-button'}>
                <FontAwesomeIcon icon={callType === 'video' ? faVideoSlash : faPhoneSlash}
                                 style={{width: 25, height: 25}}/>
            </button>}

            {(!onGoingCall && !incomingCall && !outGoingCall) && <button onClick={onCallHandler} className={'call-button action-button'}>
                <FontAwesomeIcon icon={callType === 'video' ? faVideo : faPhone}
                                 style={{width: 25, height: 25}}/>
            </button>}

        </Style>
    )
};
export default InCallActionButtons;