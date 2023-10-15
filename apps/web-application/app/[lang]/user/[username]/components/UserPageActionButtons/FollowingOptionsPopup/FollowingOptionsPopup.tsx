'use client';
import React, {FC} from "react";
import './FollowingOptionsPopup.styles.scss'
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UserPreviewImage} from "ui";

interface IProps {
    onUnFollowHandler:()=>void,
    setFollowingOptionsPop:(value:boolean)=>void,
    dictionary: {
        [key: string]: string
    },
    profileImage:string,
    username:string
}

const FollowingOptionsPopup: FC<IProps> = (
    {
        onUnFollowHandler,
        dictionary,
        setFollowingOptionsPop,
        profileImage,
        username
    }) => {
    return (
        <div className={'followingOptionsPopup'}>
            <div className={'darkenBackground'}/>
            <div className={'followingOptionsButtons'}>
                <div className={'followingOptionsHeader'}>
                    <button className={'followingOptionsCloseButton'}
                            onClick={()=>setFollowingOptionsPop(false)}>
                        <FontAwesomeIcon icon={faXmark} style={{width:25,height:25}}/>
                    </button>
                    <div className={'followingOptionsHeaderUserInfo'}>
                        <UserPreviewImage imageUrl={profileImage} size={50}/>
                        <span>{username}</span>
                    </div>

                </div>

                <button className={'userPageActionButton'}
                        onClick={()=>{
                            setFollowingOptionsPop(false)
                        }}>{dictionary?.['Mute'] || 'Mute'}  </button>
                <button className={'userPageActionButton'}
                        onClick={()=>{
                            onUnFollowHandler()
                            setFollowingOptionsPop(false)
                        }}>{dictionary?.['Unfollow'] || 'Unfollow'}  </button>
            </div>
        </div>
    )
};
export default FollowingOptionsPopup
