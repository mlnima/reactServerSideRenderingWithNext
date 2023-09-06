'use client';
import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './RecordedAudioPreview.styles.scss'
import {IDraftMessage} from "../../interfaces";

interface IProps {
    draftMessage: IDraftMessage,
    setDraftMessage: Function,
}

const RecordedAudioPreview: FC<IProps> = ({draftMessage, setDraftMessage}) => {

    return (
        <div id={'recordedAudioPreview'}>
            <button type={'button'} onClick={() => {
                setDraftMessage((prevState: IDraftMessage) => ({...prevState, audioContent: ''}))
            }}>
                <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
            </button>
            <audio className={'audio-player'} src={draftMessage.audioContent} controls/>
        </div>
    )
};
export default RecordedAudioPreview
