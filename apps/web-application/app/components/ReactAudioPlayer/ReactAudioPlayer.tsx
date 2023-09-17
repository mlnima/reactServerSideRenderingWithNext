import React, {FC, useEffect, useRef, useState} from "react";
import './ReactAudioPlayer.styles.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {base64toBlobURL} from "custom-util";

interface IProps {
    src: string;
    showControls?: boolean;
}

const ReactAudioPlayer: FC<IProps> = ({ src, showControls = true }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const updateProgress = () => {
        if (audioRef.current) {
            const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(percentage);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateProgress);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    return (
        <div className={'audioPlayer'}>
            <audio ref={audioRef} src={src} />
            <button type={'button'} onClick={togglePlay}>
                {isPlaying ? <FontAwesomeIcon icon={faPause}/> :  <FontAwesomeIcon icon={faPlay}/>}
            </button>
            {showControls && (
                <>
                    <input type="range" value={progress} readOnly />
                    {/* Add more controls as needed */}
                </>
            )}
        </div>
    );
};
export default ReactAudioPlayer
