import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {Styles} from "./AddedImagePreview.styles";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import {setDraftMessageData} from "@store_toolkit/clientReducers/messengerReducer";
import SubmitButton from "@components/pagesIncludes/messenger/MessengerMultiMediaInputBox/SubmitButton";

interface IProps {
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const AddedImagePreview: FC<IProps> = ({handleSubmit}) => {
    const dispatch = useAppDispatch()
    const {draftMessage} = useAppSelector(({messenger}) => messenger);

    return (
        <Styles>
            <div className={'added-image-preview'}>
                <div className={'image-preview-header'}>
                    <button type={'button'}
                            className={'btn btn-transparent close-btn'}
                            onClick={() => dispatch(setDraftMessageData({
                                imageContent: ''
                            }))}>
                        <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
                    </button>
                </div>
                <img src={draftMessage.imageContent} alt="image"/>
                <div className={'image-preview-footer'}>
                    <input className={'chatroom-tools-input form-control-input'}
                           maxLength={300}
                           type={'text'}
                           name={'messageData'}
                           placeholder={'Type a message'}
                           onChange={e => dispatch(setDraftMessageData({textContent: e.target.value}))}
                        // onKeyDown={onStartTypingHandler}
                    />
                    <SubmitButton handleSubmit={handleSubmit}/>
                </div>
            </div>

        </Styles>
    )
};
export default AddedImagePreview
