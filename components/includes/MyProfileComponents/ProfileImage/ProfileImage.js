import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import {userImageUpload} from '../../../../_variables/ajaxVariables'
import {updateUserData} from '../../../../_variables/ajaxAuthVariables'
import CameraSvg from '../../../../static/images/fontawesome/camera-solid.svg'


const ProfileImage = props => {
    const contextData = useContext(AppContext);
    const uploadInputElement = useRef(null)

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token',localStorage.wt)
        filesData.append('profileImage', e.target.files[0],'profile')
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        userImageUpload(filesData).then(res=>{
            const newUserData= {...contextData.userData, profileImage:res.data.path.replace('./','/')}
            contextData.dispatchUserData(newUserData)

            updateUserData(newUserData, window.location.origin).then(() => {
                contextData.functions.getAndSetUserInfo()
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })

            }).catch(err => {
                console.log(err )
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            })

        }).catch(err=>{
            console.log( err)

        })
    }
    return (
        <div className='profile-image'>
            <img className='profile-image-img' src={ contextData.userData.profileImage + '?date=' + Date.now() || '/static/images/noImage/no-image-available.png' } />
            <input ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
            <button className='upload-profile-image-btn' onClick={ () => uploadInputElement.current.click() }><img className='fontawesomeSvgSmall' src={ CameraSvg } alt=""/></button>
        </div>
    );

};
export default ProfileImage;
