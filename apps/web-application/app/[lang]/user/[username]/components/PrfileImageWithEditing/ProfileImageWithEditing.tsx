'use client';
import React, { useRef } from 'react';
import './ProfileImageWithEditing.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { imageCanvasCompressor } from '@repo/utils';
import { replaceUserProfileImage } from '@store/reducers/userReducers/userReducer';
import uploadUserProfileImage from '@lib/actions/database/users/uploadUserProfileImage';
import { ServerActionResponse } from '@lib/actions/response';
import { setAlert } from '@store/reducers/globalStateReducer';

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


        const compressedFile = await imageCanvasCompressor({
          image,
          outputType: 'file',
          maxWidth: 200,
          maxHeight: 200,
          fileName: `${userData._id}.webp`,
        }) as File;

        formData.append('file', compressedFile, compressedFile.name);


        const {
          success,
          data,
          error,
          message,
        } = await uploadUserProfileImage({ file: formData }) as unknown as ServerActionResponse<{ filePath: string }>;

        if (!success || !data?.filePath) {
          dispatch(
            setAlert({
              message: message || 'Something went wrong please try again later',
              type: 'error',
            }),
          );
          return
        }

        dispatch(replaceUserProfileImage(`${data.filePath}?time${performance.now()}`));

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



// formData.append(
//     'imagesData',
//     JSON.stringify({
//         usageType: 'profileImage',
//     }),
// );
//
// const response = await clientAPIRequestUploadProfileImage(formData);

// const imageRes = response.data.newProfileImage
//
//
//
//
//
//
// ;




// const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/upload`, {
//   method: 'POST',
//   body: formData,
// });
//
// const data = await res.json();
// console.log(`data=> `,data)
// if (data.filePath) {
//   console.log(`data.filePath=> `,data.filePath)
//   // setImagePath(data.filePath);
//   dispatch(replaceUserProfileImage(`${data.filePath}`));
// }