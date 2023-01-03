import React, {FC, useState} from "react";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

interface PropTypes {
    profileImage: string,
    size: number
}

const ImageContent: FC<PropTypes> = ({profileImage, size}) => {
    const [gotError, setGotError] = useState(false)

    if (!!profileImage && !gotError) {
        return <img className={'user-info-profile-button-image'} src={profileImage}
                    onError={() => setGotError(true)}
                    alt={'profile image'}/>
    } else {
        return <SvgRenderer svgUrl={'/asset/images/icons/user-solid.svg'}
                            size={size - 10 || 48}
                            customClassName={'user-info-profile-button-icon'}
                            color={' var(--main-text-color, #fff)'}
        />
    }
};
export default ImageContent;
