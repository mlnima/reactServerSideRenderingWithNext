import React from "react";
import {ActionButtonStyle} from "@components/pagesIncludes/chatroom/ChatRoomTools/Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {Styles} from "./RecordedAudioPreview.styles";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {useAppDispatch} from "@store_toolkit/hooks";
import {setDraftMessageData} from "@store_toolkit/clientReducers/messengerReducer";

const RecordedAudioPreview = () => {

    const dispatch = useAppDispatch()
    const {draftMessage} = useSelector(({messenger}: Store) => messenger);

    return (
        <Styles>
            <ActionButtonStyle type={'button'} onClick={() =>dispatch(setDraftMessageData({audioContent: ''})) }>
                <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
            </ActionButtonStyle>
            <audio className={'audio-player'} src={draftMessage.audioContent} controls/>
            {/*<ActionButtonStyle type={'submit'}>*/}
            {/*    <FontAwesomeIcon icon={faPaperPlane} style={{width: 25, height: 25}}/>*/}
            {/*</ActionButtonStyle>*/}
        </Styles>
    )
};
export default RecordedAudioPreview
