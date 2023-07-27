import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import socket from 'web-socket-client';
import {ActionButtonStyle} from "@components/pagesIncludes/chatroom/ChatRoomTools/Styles";

interface PropTypes {
    inputRef: React.RefObject<HTMLInputElement>,
    chatroomId: string
    authorId: string | undefined,
    setMessageText: React.Dispatch<React.SetStateAction<string>>
}

const Component: FC<PropTypes> = ({inputRef, chatroomId, authorId, setMessageText}) => {


    const onSelectImageHandler = async (event) => {
        const file = event.target.files[0];

        // Create a new Promise that resolves to the resized image
        const readerPromise = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 400;
                    const MAX_HEIGHT = 400;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    //@ts-ignore
                    ctx.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(dataUrl);
                };
                //@ts-ignore
                img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
        try {
            const messageData = await readerPromise;
            const messageBody = {
                chatroom: chatroomId,
                author: authorId,
                type: 'image',
                messageData: messageData,
            };
            socket.emit('messageToChatroom', messageBody);
            setMessageText('');
            event.target.value = null;
        } catch (error) {
            console.error(error);
        }
    };

    const onClickHandler = (event) => {
        event.preventDefault()
        if (inputRef?.current) {
            inputRef.current.click()
        }
    }

    return (
        <>
            <input ref={inputRef}
                   type="file"
                   accept="image/*"
                   style={{display: 'none'}}
                   onChange={onSelectImageHandler}/>
            <ActionButtonStyle type={'button'} className={'paperclip-button'} onClick={onClickHandler}>
                <FontAwesomeIcon icon={faCamera} style={{width: 25, height: 25}}/>
            </ActionButtonStyle>
        </>
    )
};
export default Component
