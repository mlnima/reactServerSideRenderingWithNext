'use client';
import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
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

        let options;

        if (MediaRecorder.isTypeSupported('audio/mp4;codecs=mp4a.40.2')) {
            options = { mimeType: 'audio/mp4;codecs=mp4a.40.2', audioBitsPerSecond: 16000 };
        } else {
            // Fallback if AAC is not supported
            options = { audioBitsPerSecond: 16000 };
        }
        const newRecorder = new MediaRecorder(mediaStream, options);

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
        let interval : ReturnType<typeof setTimeout> | null = null;

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
                <div className={'audio-recording-animation'} onClick={handleRecordingStop}>
                    <FontAwesomeIcon icon={faMicrophone} style={{width: 120, height: 120}}/>
                    {isRecording && <div className="counter">{elapsedTime.toFixed(1)}</div>}
                </div>
            }
            <button
                onMouseDown={handleRecordingStart}
                onMouseUp={handleRecordingStop}
                onTouchStart={handleRecordingStart}
                onTouchEnd={handleRecordingStop}
                className={'chatroomToolBoxActionBtn'}
            >
                <FontAwesomeIcon icon={faMicrophone} style={{width: 25, height: 25}}/>
            </button>
        </>
    );
};

export default VoiceRecorderButton;