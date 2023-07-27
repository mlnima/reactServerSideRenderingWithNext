import React, {FC, useMemo, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

interface PropTypes {
    profileImage: any,
    size?: number
}

const ImageContent: FC<PropTypes> = ({profileImage, size}) => {
    const [gotError, setGotError] = useState(false)
    const imageSize = useMemo(()=>size  || 24,[])

    if (!!profileImage && !gotError) {
        return <img className={'user-info-profile-button-image'}
                    src={profileImage}
                    style={{width:size || 48,height:size || 48}}
                    onError={() => setGotError(true)}
                    alt={'profile image'}/>
    } else {
        return <FontAwesomeIcon icon={faUser}
                               className={'user-info-profile-button-icon'}
                               style={{width:imageSize,height:imageSize, color:' var(--primary-text-color,#fff)'}}/>
    }
};
export default ImageContent;
