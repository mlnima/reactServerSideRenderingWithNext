import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";

import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import {userProfileImageUploadAction} from "@store_toolkit/clientReducers/userReducers/userProfileImageUploadAction";

const ProfileImageStyledDiv = styled.div`
  position: relative;
  bottom: 0;
  margin: auto;
  width: 77px;

  .profile-image-img {
    width: 77px;
    border-radius: 50%;
  }

  .upload-profile-image-btn {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background: transparent;
    border: none;
    outline: none;
    opacity: 50%;
  }

  .upload-profile-no-imag {
    border: 1px solid var(--main-text-color);
    padding: 5px;

    svg {

    }
  }

  @media only screen and (min-width: 768px) {
    width: 150px;

    .profile-image-img {
      width: 150px;
    }
  }
`

const ProfileImage = () => {
    const imageElement = useRef(null)
    const uploadInputElement = useRef(null)
    const userData = useSelector((store:Store) => store?.user?.userData)
    const dispatch = useAppDispatch()

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token', localStorage.wt)
        filesData.append('profileImage', e.target.files[0], 'profile')
        filesData.append('type', 'profile')
        dispatch(userProfileImageUploadAction(filesData))
        setTimeout(()=>{
            reSetProfileImage()
        },1000)
    }

    const reSetProfileImage = ()=>{
        if (imageElement.current){
            //@ts-ignore
            imageElement.current.src = userData?.profileImage?.filePath ? userData?.profileImage?.filePath + '?date=' + Date.now() : '/asset/images/user/noGenderAvatar150.jpg'
        }

    }
    return (
        <ProfileImageStyledDiv className='profile-image'>
            {/*//@ts-ignore*/}
            <img ref={imageElement} onClick={() => uploadInputElement.current.click()}
                 alt={'profile-image'}
                 className='profile-image-img'
                 src={userData?.profileImage?.filePath ? userData.profileImage.filePath + '?date=' + Date.now() : '/asset/images/user/noGenderAvatar150.jpg'}/>
            <input ref={uploadInputElement} type="file" style={{display: 'none'}} onChange={e => onUploadHandler(e)}/>

        </ProfileImageStyledDiv>
    );

};
export default ProfileImage;
