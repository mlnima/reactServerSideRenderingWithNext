import React, {FC} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import Link from "next/link";
import ImageContent from "@components/includes/UserProfileImage/ImageContent";
import NoSSR from "next/dist/shared/lib/dynamic-no-ssr";

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

    return (
        <Style className={'user-profile-image'} size={size}>
            {profileRedirect && loggedIn ?
                <Link href={`/profile`}>
                        <ImageContent profileImage={userData?.profileImage} size={size}/>
                </Link> : <ImageContent profileImage={userData?.profileImage} size={size}/>
            }
        </Style>
    )


};
export default UserProfileImage;
// <Link href={`/user/${userData?.username}`}>