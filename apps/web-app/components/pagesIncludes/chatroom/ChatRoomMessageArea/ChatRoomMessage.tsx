import React from "react";
import {formatDistance} from 'date-fns'
import {ChatroomMessage} from "typescript-types";
import UserPreviewImage from "ui/src/UserPreviewImage";
import Link from "next/link";
import AdminActionOnMessageMenu
    from "@components/pagesIncludes/chatroom/ChatRoomMessageArea/AdminActionOnMessageMenu";
import {Styles} from "@components/pagesIncludes/chatroom/ChatRoomMessageArea/ChatRoomMessage.styles";

interface IProps {
    message: ChatroomMessage;
}

const ChatRoomMessage: React.FC<IProps> = ({message}) => {


    return (
        <Styles className={'chatroom-message'}>
            {message?.type === 'log' &&
                <p className={'chatroom-message-log'}>
                    {message?.author?.username} joined the room
                </p>
            }
            <Link className={'user-profile-image'} href={`/user/${message?.author?.username}`}>
                <UserPreviewImage
                    imageUrl={message?.author?.profileImage?.filePath}
                    size={24}
                />
            </Link>

            <div className={'chatroom-message-data'}>
                  <span className={'chatroom-message-username'}
                        title={formatDistance(
                            new Date(message?.createdAt),
                            new Date(),
                            {addSuffix: true}
                        )}>
                    {message?.author?.username}
                  </span>

                {message?.type === 'message' &&  <p className={'chatroom-message-text'}>{message?.messageData}</p> }
                {message?.type === 'image' &&
                    <img alt={'message'} src={message?.messageData} className={'chatroom-message-image'}/>}
                {message?.type === 'audio' &&  <audio className={'audio-player'} src={message?.messageData} controls/> }

            </div>
            <AdminActionOnMessageMenu
                chatroomId={message?.chatroom}
                messageId={message?._id}
            />

        </Styles>
    )
}

export default ChatRoomMessage;

