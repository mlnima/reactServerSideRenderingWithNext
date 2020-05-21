import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import { userImageUpload } from '../../../../_variables/ajaxVariables'
import { updateUserData } from '../../../../_variables/ajaxAuthVariables'

const ProfileCoverImage = props => {
    const contextData = useContext(AppContext);
    const uploadInputElement = useRef(null)
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('profileImage', e.target.files[0])
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        userImageUpload(filesData, ).then(res=>{
            const newUserData= {...contextData.userData, profileImage:res.data.path.replace('./','/')}
            contextData.dispatchUserData(newUserData)

            updateUserData(newUserData, window.location.origin).then(() => {
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
        <div className='profile-cover-image'>
            <img src={ contextData.userData.profileImage || '/static/images/noImage/no-image-available.png' }/>
            <input ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
            <button onClick={ () => uploadInputElement.current.click() }>Upload</button>
        </div>
    );
};
export default ProfileCoverImage;
