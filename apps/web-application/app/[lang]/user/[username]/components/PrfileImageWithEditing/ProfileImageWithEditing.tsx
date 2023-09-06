'use client';
import React, {useRef} from 'react';
import {clientAPIRequestUploadImage} from "api-requests";
import './ProfileImageWithEditing.styles.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {useAppSelector} from "@store/hooks";

type UploadEvent = React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>;

const ProfileImageWithEditing = () => {
    const imageElement = useRef<HTMLImageElement>(null)
    const uploadInputElement = useRef<HTMLInputElement>(null)
    const {userData,loggedIn} = useAppSelector(({user} ) => user)

    const onUploadHandler = async (event: UploadEvent) => {
        try {
            if (loggedIn) {
                const formData = new FormData();
                //@ts-ignore
                const image = 'files' in event.target ? event.target.files?.[0] : event.dataTransfer?.files[0];
                if (!image) return;

                const newName = `${userData?._id}-profile-${Date.now()}${image.name.substr(image.name.lastIndexOf('.'))}`;
                const renamedFile = new File([image], newName, { type: image.type });

                formData.append('images', renamedFile);
                formData.append('imagesData', JSON.stringify({
                    usageType: 'profileImage',
                    width: 480,
                    height: 480,
                }));

                const response = await clientAPIRequestUploadImage(formData);
                const imageRes = response.data.images[0];

                if (imageElement.current) {
                    imageElement.current.src = imageRes.filePath;
                }
            }
        } catch (error) {
            // Handle error here
        }
    };
    // const onUploadHandler =async (event:React.ChangeEvent<HTMLInputElement>) => {
    //     try {
    //         if (loggedIn){
    //             const formData = new FormData()
    //             const image = 'files' in event.target ? event.target.files?.[0] : event.dataTransfer?.files[0];
    //             const newName = `${userData?._id}-profile-${Date.now()}${image?.name.substr(image?.name.lastIndexOf('.'))}`;
    //             const renamedFile = new File([image], newName, {type: image.type})
    //             formData.append('images', renamedFile);
    //
    //             formData.append('imagesData', JSON.stringify({
    //                 usageType: 'profileImage',
    //                 width:480,
    //                 height:480
    //             }));
    //
    //             await clientAPIRequestUploadImage(formData).then((response) => {
    //                 const image = response.data.images[0]
    //                 if (imageElement.current){
    //                     imageElement.current.src = image.filePath
    //                 }
    //             })
    //         }
    //     }catch (error){
    //
    //     }
    // }

    const onImageClickHandler = ()=>{
        if (uploadInputElement.current){
            uploadInputElement.current.click()
        }
    }

    return (
        <div className='profileImage'>

            <img ref={imageElement} onClick={onImageClickHandler}
                 alt={userData?.username || 'profile image'}
                 src={userData?.profileImage?.filePath || '/asset/images/user/noGenderAvatar150.jpg'}/>
            <FontAwesomeIcon className={'plus-icon'} icon={faCirclePlus} style={{width: '20px', height: '20px'}}/>
            <input ref={uploadInputElement} type="file" style={{display: 'none'}} onChange={e => onUploadHandler(e)}/>

        </div>
    );

};
export default ProfileImageWithEditing;
