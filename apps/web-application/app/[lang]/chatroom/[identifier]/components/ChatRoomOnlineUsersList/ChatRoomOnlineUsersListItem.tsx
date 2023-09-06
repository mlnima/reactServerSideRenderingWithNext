import React, {FC} from 'react';
import Link from "next/link";
import './ChatRoomOnlineUsersListItem.styles.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

interface IProps {
    username: string,
    profileImage: {
        filePath: string
    }
}

const ChatRoomOnlineUsersListItem: FC<IProps> = ({username, profileImage}) => {
    return (
        <div className={'chatroomOnlineUsersListItem'}>
            <div className='onlineUserDataWrapper'>
                <div className='onlineUserData'>
                    <Link href={`/user/${username}`}>
                        {profileImage?.filePath ?
                            <img className={'user-preview-image'} src={profileImage?.filePath}
                                 style={{width: 16, height: 16}}
                                 alt={'profile image'}/> :
                            <FontAwesomeIcon icon={faUser}
                                             className={'user-preview-image-icon'}
                                             style={{
                                                 width: 16,
                                                 height: 16,
                                                 color: ' var(--primary-text-color,#fff)'
                                             }}/>}
                        <p className='onlineUserUsername'>{username}</p>
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default ChatRoomOnlineUsersListItem;
