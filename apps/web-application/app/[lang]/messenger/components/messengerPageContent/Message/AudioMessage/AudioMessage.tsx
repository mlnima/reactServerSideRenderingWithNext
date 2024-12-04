'use client';
import React, { FC, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import './AudioMessage.scss';

interface IProps {
    audioContent: string;
}

const AudioMessage: FC<IProps> = ({ audioContent }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlay = async () => {
        if (audioRef.current) await audioRef.current.play();
    };

    const handlePause = () => {
        if (audioRef.current) audioRef.current.pause();
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return (
        <div id={'AudioMessage'}>
            <button onClick={handlePlay} className={'btn btn-active'}>
                <FontAwesomeIcon icon={faPlay} />
            </button>
            <button onClick={handlePause} className={'btn btn-active'}>
                <FontAwesomeIcon icon={faPause} />
            </button>
            <button onClick={handleStop} className={'btn btn-active'}>
                <FontAwesomeIcon icon={faStop} />
            </button>
            <audio ref={audioRef} src={audioContent}></audio>
        </div>
    );
};

export default AudioMessage;
