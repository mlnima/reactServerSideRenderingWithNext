import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../../../../context/AppContext'
import {userImageUpload} from '../../../../_variables/ajaxVariables'
import {updateUserData} from '../../../../_variables/ajaxAuthVariables'
import ProfileImage from '../ProfileImage/ProfileImage'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

const ProfileCoverImage = props => {
    const contextData = useContext(AppContext);
    const uploadInputElement = useRef(null)
    const [state, setState] = useState({
        style: {
            backgroundImage: 'linear-gradient(to bottom right, var(--navigation-background-color), black)'
        }
    });

    useEffect(() => {
        setState({
            ...state,
            style: {
                ...state.style,
                backgroundImage: contextData?.userData?.coverImage ? `url('${contextData.userData.coverImage + '?date=' + Date.now()}` : 'linear-gradient(to bottom right, var(--navigation-background-color), black)'
            },
            svgStyle: {
                border: 'solid black 1px',
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: '5px',
                zIndex: '17',
                width: '25px',
                height: ' 25px',
            }
        })
    }, [contextData.userData.coverImage]);

    // useEffect(() => {

    // }, [contextData.userData]);

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
            const newUserData = {...contextData.userData, coverImage: res.data.path.replace('./', '/')}

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

    // }, [ contextData.userData.coverImage ]);

    return (
        <div className='profile-cover-image' style={state.style}>
            <style jsx>{`
                .profile-cover-image{
                    position: relative;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    height: 300px;
                    max-height: 588px;
                  
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
            <input ref={uploadInputElement} type="file" style={{display: 'none'}} onChange={e => onUploadHandler(e)}/>
            <button className='upload-profile-image-btn' onClick={() => uploadInputElement.current.click()}>
                <FontAwesomeIcon style={{...state.svgStyle, width: '20px', height: '20px'}} className='upload-profile-image-btn-svg' icon={faCamera}/>
            </button>
            <ProfileImage svgStyle={state.svgStyle}/>
        </div>
    );
};
export default ProfileCoverImage;
