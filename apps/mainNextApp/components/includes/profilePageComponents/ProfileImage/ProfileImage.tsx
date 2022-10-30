import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {fetchUserProfileImageUpload} from "../../../../store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const ProfileImageStyledDiv = styled.div`
  position: relative;
  bottom: 0;
  margin: auto;
  width: 77px;
  border: black 1px solid;
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
        dispatch(fetchUserProfileImageUpload(filesData))
        setTimeout(()=>{
            reSetProfileImage()
        },1000)
    }

    const reSetProfileImage = ()=>{
        imageElement.current.src = userData?.profileImage ? userData?.profileImage + '?date=' + Date.now() : '/public/asset/images/user/noGenderAvatar150.jpg'
    }
    return (
        <ProfileImageStyledDiv className='profile-image'>
            <img ref={imageElement} onClick={() => uploadInputElement.current.click()}
                 className='profile-image-img'
                 src={userData?.profileImage ? userData?.profileImage + '?date=' + Date.now() : '/public/asset/images/user/noGenderAvatar150.jpg'}/>
            <input ref={uploadInputElement} type="file" style={{display: 'none'}} onChange={e => onUploadHandler(e)}/>

        </ProfileImageStyledDiv>
    );

};
export default ProfileImage;
