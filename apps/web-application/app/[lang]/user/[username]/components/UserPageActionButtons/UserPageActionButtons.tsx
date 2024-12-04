'use client';
import React, { FC, useState, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/navigation';
import { loginRegisterForm } from '@store/reducers/globalStateReducer';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { followUserAction } from '@store/reducers/userReducers/followUserAction';
import { unfollowUserAction } from '@store/reducers/userReducers/unfollowUserAction';
import { clientAPIRequestStartAConversation } from '@repo/api-requests';
import './UserPageActionButtons.styles.scss';
import FollowingOptionsPopup from './FollowingOptionsPopup/FollowingOptionsPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {AxiosResponse} from "axios";
import {IUserPageData} from "@repo/typescript-types";


interface IProps {
    _id?: string;
    dictionary: {
        [key: string]: string;
    };
    didRequesterFollowThisUser: boolean;
    setUserPageData: Dispatch<SetStateAction<IUserPageData>>;
    profileImage: string;
    username: string;
    isUserOwnProfile: boolean;
}

const UserPageActionButtons: FC<IProps> = ({
    _id,
    dictionary,
    didRequesterFollowThisUser,
    setUserPageData,
    profileImage,
    username,
    isUserOwnProfile,
}) => {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const { userData, loggedIn } = useAppSelector(({ user }) => user);
    const [followingOptionsPop, setFollowingOptionsPop] = useState(false);

    const onFollowHandler = () => {
        if (!!_id && loggedIn && !!userData?._id) {
            dispatch(followUserAction(_id));
            setUserPageData(prevState => ({
                ...prevState,
                didRequesterFollowThisUser: true,
                followersCount: prevState?.followersCount + 1,
            }));
        }
    };

    const onUnFollowHandler = () => {
        if (_id) {
            dispatch(unfollowUserAction(_id));
            setUserPageData(prevState => ({
                ...prevState,
                didRequesterFollowThisUser: false,
                followersCount: prevState?.followersCount - 1,
            }));
        }
    };

    const onConversationHandler = async () => {
        if (!!userData?._id && !!_id) {
            await clientAPIRequestStartAConversation({ users: [_id, userData?._id] }).then((response:AxiosResponse) => {
                if (response?.data?.conversation?._id) {
                    push(`/messenger?_id=${response.data.conversation._id}`);
                }
            });
        } else {
            dispatch(loginRegisterForm('login'));
        }
    };

    return (
        <div className="userPageActionButtons">
            {isUserOwnProfile && (
                <>
                    <button
                        className={'userPageActionButton btn btn-transparent'}
                        onClick={() => push(`/account/edit`)}
                    >
                        {dictionary?.['Edit Profile'] || 'Edit Profile'}
                    </button>
                </>
            )}

            {!isUserOwnProfile && (
                <>
                    <button className={'userPageActionButton btn btn-transparent'} onClick={onConversationHandler}>
                        {dictionary?.['Send Message'] || 'Send Message'}
                    </button>
                    <div>
                        {followingOptionsPop && (
                            <FollowingOptionsPopup
                                setFollowingOptionsPop={setFollowingOptionsPop}
                                onUnFollowHandler={onUnFollowHandler}
                                username={username}
                                profileImage={profileImage}
                                dictionary={dictionary}
                            />
                        )}
                        {didRequesterFollowThisUser ? (
                            <button
                                className={'userPageActionButton btn btn-transparent'}
                                onClick={() => setFollowingOptionsPop(true)}
                            >
                                {dictionary?.['Follow'] || 'Follow'}
                                <FontAwesomeIcon icon={faChevronDown} style={{ width: 10, height: 10 }} />
                            </button>
                        ) : (
                            <button className="userPageActionButton btn btn-transparent" onClick={onFollowHandler}>
                                {dictionary?.['Follow'] || 'Follow'}{' '}
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
export default UserPageActionButtons;


// {didRequesterFollowThisUser ?
//     <button className='user-page-action-button action-client-button-link'
//             onClick={onUnFollowHandler}>{dictionary?.['Unfollow'] || 'Unfollow'}  </button> :
//     <button className='user-page-action-button action-client-button-link'
//             onClick={onFollowHandler}>{dictionary?.['Follow'] || 'Follow'} </button>
// }