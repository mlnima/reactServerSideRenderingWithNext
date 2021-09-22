import React, { useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import {userImageUpload} from '../../../../_variables/ajaxVariables'
import {updateUserData} from '../../../../_variables/ajaxAuthVariables'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";

const ProfileImage = props => {
    const contextData = useContext(AppContext);
    const uploadInputElement = useRef(null)

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token',localStorage.wt)
        filesData.append('profileImage', e.target.files[0],'profile')
        filesData.append('type', 'profile')
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        userImageUpload(filesData).then(res=>{
            const newUserData= {...contextData.userData, profileImage:res.data.path.replace('./','/')}
            contextData.dispatchUserData(newUserData)

            updateUserData(newUserData).then(() => {
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
            <style jsx>{`
                .profile-image {
                    position: relative;
                    bottom: 0;
                    margin: auto;
                    width: 77px;
                   // place-items: center;
                    border: black 1px solid;
                }
                .profile-image-img {
                    width: 77px;
                    border-radius: 50%;
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
                
                .upload-profile-no-imag{
                  border: 1px solid var(--main-text-color) ;
                  padding: 5px;
                  svg{

                  }
                }
                
                @media only screen and (min-width: 768px){
                .profile-image{
                 width: 150px;
                }
                .profile-image-img {
                    width: 150px;
                }
                }

            `}</style>
            <img onClick={ () => uploadInputElement.current.click() }
                 className='profile-image-img'
                 src={contextData?.userData?.profileImage ? contextData?.userData?.profileImage + '?date=' + Date.now() : '/public/asset/images/user/noGenderAvatar150.jpg' } />
            <input ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>

        </div>
    );

};
export default ProfileImage;


// <button className='upload-profile-image-btn' onClick={ () => uploadInputElement.current.click() }>
//     <FontAwesomeIcon style={{...props.svgStyle,width:'20px',height:'20px' }} className='upload-profile-image-btn-svg'  icon={faCamera} />
// </button>