import React, {FC, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRepeat} from "@fortawesome/free-solid-svg-icons";
import {faVideoSlash} from "@fortawesome/free-solid-svg-icons/faVideoSlash";
import {faMicrophoneSlash} from "@fortawesome/free-solid-svg-icons/faMicrophoneSlash";
import {faPhoneSlash} from "@fortawesome/free-solid-svg-icons/faPhoneSlash";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {useSelector} from "react-redux";
import { useAppSelector } from '@store/hooks';

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
    setInCallButtonsVisible: (value:boolean) => void,
    InCallButtonsRef: React.LegacyRef<HTMLDivElement>
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
        <div className={`inCallActionsButtons ${inCallButtonsVisible ? 'visible' : ''} ${incomingCall && 'incomingCall'}`}
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

        </div>
    )
};
export default InCallActionButtons;