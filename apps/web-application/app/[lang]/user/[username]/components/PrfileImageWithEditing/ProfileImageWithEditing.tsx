'use client';
import React, { useRef } from 'react';
import './ProfileImageWithEditing.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { imageCanvasCompressor } from '@repo/utils';
import { clientAPIRequestUploadProfileImage } from '@repo/api-requests';
import { replaceUserProfileImage } from '@store/reducers/userReducers/userReducer';

type UploadEvent = React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>;

const ProfileImageWithEditing = () => {
    const dispatch = useAppDispatch();
    const uploadInputElement = useRef<HTMLInputElement>(null);
    const { userData, loggedIn } = useAppSelector(({ user }) => user);

    const onUploadHandler = async (event: UploadEvent): Promise<void> => {
        try {
            if (loggedIn) {
                const formData = new FormData();

                const image = 'files' in event.target ?
                    event.target.files?.[0] :
                    // @ts-expect-error: need fix
                    (event as React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>)?.dataTransfer?.files[0];
                if (!image) return;

                formData.append(
                    'images',
                    await imageCanvasCompressor({
                        image,
                        outputType: 'file',
                        maxWidth: 200,
                        maxHeight: 200,
                    }),
                );

                formData.append(
                    'imagesData',
                    JSON.stringify({
                        usageType: 'profileImage',
                    }),
                );

                const response = await clientAPIRequestUploadProfileImage(formData);

                const imageRes = response.data.newProfileImage;
                dispatch(replaceUserProfileImage(imageRes));
            }
        } catch {
            return;
        }
    };

    const onImageClickHandler = () => {
        if (uploadInputElement.current) {
            uploadInputElement.current.click();
        }
    };

    return (
        <div
            className="profileImage"
            onDrop={async e => {
                e.preventDefault();
                await onUploadHandler(e);
            }}
            onDragOver={e => e.preventDefault()}
        >
            <img
                onClick={onImageClickHandler}
                alt={userData?.username || 'profile image'}
                src={userData?.profileImage?.filePath || '/asset/images/user/noGenderAvatar150.jpg'}
            />
            <FontAwesomeIcon
                className={'plus-icon'}
                onClick={onImageClickHandler}
                icon={faCirclePlus}
                style={{ width: '20px', height: '20px' }}
            />
            <input
                ref={uploadInputElement}
                type="file"
                style={{ display: 'none' }}
                onChange={e => onUploadHandler(e)}
            />
        </div>
    );
};
export default ProfileImageWithEditing;
