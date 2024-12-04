'use client';
import React, {FC, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import './ImageContent.styles.scss'

interface PropTypes {
    profileImage: string,
    size?: number
}

const ImageContent: FC<PropTypes> = ({profileImage, size}) => {
    const [gotError, setGotError] = useState(false)

    if (profileImage && !gotError) {
        return <img className={'user-info-profile-button-image'} src={profileImage}
                    onError={() => setGotError(true)}
                    style={{width:size,height:size}}
                    alt={'profile image'}/>
    } else {
        return<FontAwesomeIcon icon={faUser}
                               className={'user-info-profile-button-icon'}
                               style={{width:size,height:size, color:' var(--primary-text-color,#fff)'}}/>
    }
};
export default ImageContent;
