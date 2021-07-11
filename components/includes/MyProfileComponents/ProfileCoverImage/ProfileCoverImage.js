import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import { userImageUpload } from '../../../../_variables/ajaxVariables'
import { updateUserData } from '../../../../_variables/ajaxAuthVariables'
import ProfileImage from '../ProfileImage/ProfileImage'
import CameraSvg from '../../../../static/images/fontawesome/camera-solid.svg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

const ProfileCoverImage = props => {
    const contextData = useContext(AppContext);
    const uploadInputElement = useRef(null)
    const [ state, setState ] = useState({
        style: {
            backgroundImage: `url('/static/images/noImage/no-image-available.png')`
        }
    });

    useEffect(() => {
        setState({
            ...state,
            style: {
                ...state.style,
                backgroundImage:contextData.userData.coverImage ? `url('${ contextData.userData.coverImage + '?date=' + Date.now()}`  :  `url('/static/images/noImage/no-image-available.png')`
            }
        })
    }, [ contextData.userData.coverImage ]);

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token', localStorage.wt)
        filesData.append('profileImage', e.target.files[0], 'cover')
        filesData.append('type', 'cover')
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        userImageUpload(filesData).then(res => {
            const newUserData = { ...contextData.userData, coverImage: res.data.path.replace('./', '/') }
            console.log(newUserData)
            contextData.dispatchUserData(newUserData)

            updateUserData(newUserData, window.location.origin).then(() => {
                contextData.functions.getAndSetUserInfo()
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })

            }).catch(err => {
                console.log(err)
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            })

        }).catch(err => {
            console.log(err)

        })
    }

    // useEffect(() => {
    //     console.log(contextData.userData.coverImage)
    // }, [ contextData.userData.coverImage ]);

    return (
        <div className='profile-cover-image' style={ state.style }>
            <style jsx>{`
                .profile-cover-image{
                    position: relative;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    height: 300px;
                }
                 .upload-profile-image-btn{
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    background: transparent;
                    border: none;
                    outline: none;
                    opacity: 50%;
                }
             `}</style>
            <input ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
            <button className='upload-profile-image-btn' onClick={ () => uploadInputElement.current.click() }>
                <FontAwesomeIcon style={{width:'20px',height:'20px'}} className='upload-profile-image-btn-svg'  icon={faCamera} />
            </button>
            <ProfileImage/>
        </div>
    );
};
export default ProfileCoverImage;
