import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";

interface PropTypes {
    audioMessage: string,
    setAudioMessage: (audioMessage: string) => void
}

const RecordedAudioPreview: FC<PropTypes> = ({audioMessage, setAudioMessage}) => {
    return (
        <>
            <button type={'button'}
                    className={'chatroomToolBoxActionBtn'}
                    onClick={() => setAudioMessage('')}>
                <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
            </button>
            <audio className={'audioPlayer'} src={audioMessage} controls/>
            <button className={'chatroomToolBoxActionBtn'} type={'submit'}>
                <FontAwesomeIcon icon={faPaperPlane} style={{width: 25, height: 25}}/>
            </button>
        </>
    )
};
export default RecordedAudioPreview
