import React, {FC, memo, useMemo} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import Link from "next/link";
import ImageContent from "@components/includes/UserProfileImage/ImageContent";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .user-info-profile-button-image {
    border-radius: 50%;
    width: ${({size}: UserProfileImageStylePropTypes) => size || 48}px;
    height: ${({size}: UserProfileImageStylePropTypes) => size || 48}px;
    box-sizing: border-box;
  }

  .user-info-profile-button-icon {
    cursor: pointer;
    color: var(--secondary-text-color,#ccc);
  }
`

interface UserProfileImageStylePropTypes {
    size?: number
}

interface UserProfileImagePropTypes {
    size?: number,
    profileRedirect?: boolean,
}

const UserProfileImage: FC<UserProfileImagePropTypes> = ({size, profileRedirect}) => {

    const {userData, loggedIn} = useSelector(({user}: Store) => {
        return {
            loggedIn: user.loggedIn,
            userData: user?.userData
        }
    })

    const profileImage = useMemo(() => userData?.profileImage?.filePath,[userData?.profileImage?.filePath])


    return (
        <Style className={'user-profile-image'} size={size}>
            {profileRedirect && loggedIn ?
                <Link href={`/profile`}><ImageContent profileImage={profileImage} size={size}/></Link> :
                <ImageContent profileImage={userData?.profileImage?.filePath} size={size}/>
            }
        </Style>
    )


};
export default memo(UserProfileImage);
