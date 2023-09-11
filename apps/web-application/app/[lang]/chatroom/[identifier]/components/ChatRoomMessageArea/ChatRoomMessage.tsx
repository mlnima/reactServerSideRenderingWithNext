import React from "react";
import {formatDistance} from 'date-fns'
import {ChatroomMessage} from "typescript-types";
import {UserPreviewImage} from "ui";
import Link from "next/link";
import AdminActionOnMessageMenu from "./AdminActionOnMessageMenu";
import './ChatRoomMessage.styles.scss';

interface IProps {
    message: ChatroomMessage,
    onDeleteMessageHandler: (messageId: string) => void
}

const ChatRoomMessage: React.FC<IProps> = ({message,onDeleteMessageHandler}) => {

    return (
        <div className={'chatroomMessage'}>
            {message?.type === 'log' &&
                <p className={'chatroomMessageLog'}>
                    {message?.author?.username} joined the room
                </p>
            }
            <Link className={'userProfileImage'} href={`/user/${message?.author?.username}`}>
                <UserPreviewImage

                    imageUrl={message?.author?.profileImage?.filePath}
                    size={24}
                />
            </Link>

            <div className={'chatroomMessageData'}>
                  <span className={'chatroomMessageUsername'}
                        title={!!message?.createdAt ? formatDistance(
                            new Date(message?.createdAt),
                            new Date(),
                            {addSuffix: true}
                        ) : 'Time Stamp Missing'}>
                    {message?.author?.username}
                  </span>

                {message?.type === 'message' && <p className={'chatroomMessageText'}>{message?.messageData}</p>}
                {message?.type === 'image' &&
                    <img alt={'message'} src={message?.messageData} className={'chatroomMessageImage'}/>}
                {message?.type === 'audio' && <audio className={'audioPlayer'} src={message?.messageData} controls/>}

            </div>
            <AdminActionOnMessageMenu
                onDeleteMessageHandler={onDeleteMessageHandler}
                authorId={message?.author?._id}
                messageId={message?._id}
            />

        </div>
    )
}

export default ChatRoomMessage;

