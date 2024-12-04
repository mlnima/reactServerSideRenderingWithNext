import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import SubmitButton from "./SubmitButton";
import './AddedImagePreview.styles.scss'
import {IDraftMessage} from "../../interfaces";

interface IProps {
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    draftMessage: IDraftMessage,
    setDraftMessage: React.Dispatch<React.SetStateAction<IDraftMessage>>;
}

const AddedImagePreview: FC<IProps> = ({handleSubmit, draftMessage, setDraftMessage}) => {

    return (
        <div className={'addedImagePreview'}>
            <div className={'added-image-preview'}>
                <div className={'image-preview-header'}>
                    <button type={'button'}
                            className={'btn btn-transparent close-btn'}
                            onClick={() =>
                                setDraftMessage((prevState: IDraftMessage) => ({...prevState, imageContent: ''}))
                            }>
                        <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
                    </button>
                </div>
                <img src={draftMessage.imageContent} alt="image"/>
                <div className={'image-preview-footer'}>
                    <input className={'chatroom-tools-input primaryInput'}
                           maxLength={300}
                           type={'text'}
                           name={'messageData'}
                           placeholder={'Type a message'}
                           onChange={e => {
                               setDraftMessage((prevState: IDraftMessage) => ({
                                   ...prevState,
                                   textContent: e.target.value
                               }))
                           }}
                    />
                    <SubmitButton handleSubmit={handleSubmit}/>
                </div>
            </div>

        </div>
    )
};
export default AddedImagePreview
