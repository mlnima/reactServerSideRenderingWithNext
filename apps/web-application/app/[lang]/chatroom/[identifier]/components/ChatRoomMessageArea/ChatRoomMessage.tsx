'use client';
import React from 'react';
import { formatDistance } from 'date-fns';
import { ChatroomMessage } from "@repo/typescript-types";
import { UserPreviewImage } from '@repo/ui';
import Link from 'next/link';
import AdminAuthorMessageActionMenu from './AdminAuthorMessageActionMenu';
import './ChatRoomMessage.styles.scss';
import ReactAudioPlayer from '@components/ReactAudioPlayer/ReactAudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    message: ChatroomMessage;
    onDeleteMessageHandler: (messageId: string) => void;
}

const ChatRoomMessage: React.FC<IProps> = ({ message, onDeleteMessageHandler }) => {

    const timeStamp = message?.createdAt
        ? formatDistance(new Date(message?.createdAt), new Date(), {
            addSuffix: true,
        })
        : ''

    return (
        <div className={'chatroomMessage'}>
            {message?.type === 'log' ? (
                <FontAwesomeIcon
                    icon={faRobot}
                    className={'user-preview-image-icon'}
                    style={{ width: 24, height: 24, color: ' var(--primary-text-color,#fff)' }}
                />
            ) : (
                <Link className={'userProfileImage'} href={`/user/${message?.author?.username}`}>
                    <UserPreviewImage
                        imageUrl={message?.author?.profileImage?.filePath}
                        size={24}
                    />
                </Link>
            )}

            <div className={'chatroomMessageData'}>
                <span
                    className={'chatroomMessageUsername'}
                    title={timeStamp}
                >

                    {message?.author?.username}
                    <span className={'messageTimeStamp'}>{timeStamp}</span>
                </span>
                <div className={'chatroomMessageContent'}>
                    {message?.type === 'message' && (
                        <p className={'chatroomMessageText'}>{message?.messageData}</p>
                    )}

                    {message?.type === 'image' && (
                        <img
                            alt={'message'}
                            src={message?.messageData}
                            className={'chatroomMessageImage'}
                        />
                    )}
                    {message?.type === 'audio' && <ReactAudioPlayer src={message?.messageData} />}

                    {message?.type === 'log' && (
                        <p className={'chatroomMessageLog'}>{message?.messageData}</p>
                    )}
                </div>
            </div>
            <AdminAuthorMessageActionMenu
                onDeleteMessageHandler={onDeleteMessageHandler}
                authorId={message?.author?._id}
                messageId={message?._id}
            />
        </div>
    );
};

export default ChatRoomMessage;
