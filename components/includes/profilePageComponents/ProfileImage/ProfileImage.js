import React, {useRef} from 'react';
import {userImageUpload} from '@_variables/_ajaxFilesVariables'
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "@store/clientActions/globalStateActions";
import styled from "styled-components";

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

const ProfileImage = props => {
    const imageElement = useRef(null)
    const uploadInputElement = useRef(null)
    const userData = useSelector(store => store?.user?.userData)
    const dispatch = useDispatch()
    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token', localStorage.wt)
        filesData.append('profileImage', e.target.files[0], 'profile')
        filesData.append('type', 'profile')
        dispatch(setLoading(true))
        userImageUpload(filesData).then(res => {
            res.data?.path ? imageElement.current.src = res.data.path + '?date=' + Date.now() : null
            dispatch(setLoading(false))
        })
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
