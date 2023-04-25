import React, {FC} from "react";
import {ActionButtonStyle} from "@components/pagesIncludes/chatroom/ChatRoomTools/Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";

interface PropTypes {
    audioMessage: string,
    setAudioMessage: (audioMessage: string) => void
}

const RecordedAudioPreview: FC<PropTypes> = ({audioMessage,setAudioMessage}) => {
    return (
        <>
            <ActionButtonStyle type={'button'} onClick={() => setAudioMessage('')}>
                <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
            </ActionButtonStyle>
            <audio className={'audio-player'} src={audioMessage} controls/>
            <ActionButtonStyle type={'submit'}>
                <FontAwesomeIcon icon={faPaperPlane} style={{width: 25, height: 25}}/>
            </ActionButtonStyle>
        </>
    )
};
export default RecordedAudioPreview
