'use client';
import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './RecordedAudioPreview.styles.scss';
import {IDraftMessage} from "../../interfaces";
import ReactAudioPlayer from "@components/ReactAudioPlayer/ReactAudioPlayer";

interface IProps {
    draftMessage: IDraftMessage,
    setDraftMessage: React.Dispatch<React.SetStateAction<IDraftMessage>>;
}

const RecordedAudioPreview: FC<IProps> = ({draftMessage, setDraftMessage}) => {

    return (
        <div id={'recordedAudioPreview'}>
            <button type={'button'} className={'discardAudioMessage'} onClick={() => {
                setDraftMessage((prevState: IDraftMessage) => ({...prevState, audioContent: ''}))
            }}>
                <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
            </button>
            <ReactAudioPlayer src={draftMessage.audioContent} showControls={true}/>
        </div>
    )

};

export default RecordedAudioPreview;
