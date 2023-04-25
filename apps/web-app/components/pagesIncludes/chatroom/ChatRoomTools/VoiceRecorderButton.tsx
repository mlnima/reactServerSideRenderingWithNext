import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {ActionButtonStyle} from '@components/pagesIncludes/chatroom/ChatRoomTools/Styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';

interface IProps {
    setAudioMessage: Dispatch<SetStateAction<string>>;
}

const VoiceRecorderButton: FC<IProps> = ({setAudioMessage}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleRecordingStart = async () => {
        setIsRecording(true);
        const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});

        const newRecorder = new MediaRecorder(mediaStream, {
            mimeType: 'audio/webm;codecs=opus',
            audioBitsPerSecond: 16000,
        });

        newRecorder.addEventListener('dataavailable', (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        });

        newRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/webm;codecs=opus'});
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
                const base64data = reader.result;
                setAudioMessage(base64data as string);
            };

            audioChunksRef.current = [];
        });

        newRecorder.start();
        setRecorder(newRecorder);

        setTimeout(() => {
            if (newRecorder.state === 'recording') {
                newRecorder.stop();
                mediaStream.getTracks().forEach((track) => track.stop());
                setRecorder(null);
            }
        }, 15000);
    };

    const handleRecordingStop = () => {
        if (recorder) {
            recorder.stop();
            recorder.stream.getTracks().forEach((track) => track.stop());
            setRecorder(null);
            setIsRecording(false)
        }
    };

    useEffect(() => {
        let interval;

        if (isRecording) {
            interval = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 0.1);
            }, 100);
        } else {
            setElapsedTime(0);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording]);

    return (
        <>
            {isRecording &&
                <div className={'audioRecordingAnimation'} onClick={handleRecordingStop}>
                    <FontAwesomeIcon icon={faMicrophone} style={{width: '120px', height: '120px'}}/>
                    {isRecording && <div className="counter">{elapsedTime.toFixed(1)}</div>}
                </div>
            }
            <ActionButtonStyle
                onMouseDown={handleRecordingStart}
                onMouseUp={handleRecordingStop}
                onTouchStart={handleRecordingStart}
                onTouchEnd={handleRecordingStop}
            >
                <FontAwesomeIcon icon={faMicrophone} style={{width: 25, height: 25}}/>
            </ActionButtonStyle>
        </>
    );
};

export default VoiceRecorderButton;