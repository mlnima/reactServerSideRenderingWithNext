'use client';
import React, { ChangeEvent, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import socket from '@lib/web-socket-client';
import { useAppSelector } from '@store/hooks';
import { imageCanvasCompressor } from '@repo/utils';

interface PropTypes {
  inputRef: React.RefObject<HTMLInputElement | null>,
  chatroomId: string
  authorId: string | undefined,
  setMessageText: React.Dispatch<React.SetStateAction<string>>
}

const UploadImageButton: FC<PropTypes> = ({ inputRef, chatroomId, authorId, setMessageText }) => {
  const { userData } = useAppSelector(({ user }) => user);
  const onSelectImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) { // Check if the file is not null
      try {
        const messageData = await imageCanvasCompressor({
          image: file,
          maxWidth: 400,
          maxHeight: 400,
        });
        const messageBody = {
          chatroom: chatroomId,
          author: authorId,
          type: 'image',
          messageData: messageData,
        };
        socket.emit('messageToChatroom', {
          messageBody,
          authorData: {
            profileImage: {
              filePath: userData.profileImage?.filePath,
            },
            username: userData.username,
            _id: userData._id,
          },
        });
        setMessageText('');
        event.target.value = '';
      } catch (error) {
        console.error(error);
      }
    }
  };



  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input ref={inputRef}
             type="file"
             accept="image/*"
             style={{ display: 'none' }}
             onChange={onSelectImageHandler} />

      <button className={'chatroomToolBoxActionBtn paperclip-button'}
              type={'button'}
              onClick={e => onClickHandler(e)}>
        <FontAwesomeIcon icon={faCamera} style={{ width: 25, height: 25 }} />
      </button>
    </>
  );
};

export default UploadImageButton;


// const onSelectImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files && event.target.files[0];
//
//     if (event.target.files) {
//         try {
//             const messageData = await imageCanvasCompressor({
//                 image:file,
//                 maxWidth:400,
//                 maxHeight:400
//             });
//             const messageBody = {
//                 chatroom: chatroomId,
//                 author: authorId,
//                 type: 'image',
//                 messageData: messageData,
//             };
//             socket.emit('messageToChatroom', {
//                 messageBody,
//                 authorData: {
//                     profileImage: {
//                         filePath:userData.profileImage?.filePath
//                     },
//                     username: userData.username,
//                     _id: userData._id
//                 }
//             });
//             setMessageText('');
//             event.target.value = ''
//         } catch (error) {
//             console.error(error);
//         }
//     }
// };