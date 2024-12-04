'use client';
import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setUserConfigMenu } from '@store/reducers/globalStateReducer';
import UserProfileImage from '@components/UserProfileImage/UserProfileImage';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import './Authentication.scss';

const Authentication: FC = () => {
    const dispatch = useAppDispatch();
    const profileImage = useAppSelector(({ user }) => user?.userData?.profileImage?.filePath);
    const [renderUserProfileImage, setRenderUserProfileImage] = useState(false);

    useEffect(() => {
        if (profileImage) {
            setRenderUserProfileImage(true);
        }
    }, [profileImage]);

    return (
        <div className={'authWidget'}>
            <button
                className={'authMenuOpenButton  btn btn-transparent'}
                onClick={() => dispatch(setUserConfigMenu(true))}
                aria-label={'user Menu'}
            >
                {renderUserProfileImage ? <UserProfileImage size={27} /> : <FontAwesomeIcon icon={faCircleUser} className={'userIcon'} />}
            </button>
        </div>
    );
};

export default Authentication;
