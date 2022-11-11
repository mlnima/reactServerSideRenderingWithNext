import React, {FC} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import SvgRenderer from "../../global/commonComponents/SvgRenderer/SvgRenderer";
import Link from "next/link";

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


    const ImageContent = () => userData?.profileImage ?
        <img className={'user-info-profile-button-image'} src={userData?.profileImage}
             alt={'profile image'}/>
        :
        <SvgRenderer svgUrl={'/asset/images/icons/user-solid.svg'}
                     size={size - 10 || 48}
                     customClassName={'user-info-profile-button-icon'}
                     color={' var(--main-text-color, #fff)'}
        />

    return (
        <Style className={'user-profile-image'} size={size}>
            {profileRedirect && loggedIn ?

                <Link href={`/profile`}>
                        <ImageContent/>
                </Link> : <ImageContent/>
            }
        </Style>
    )


};
export default UserProfileImage;
// <Link href={`/user/${userData?.username}`}>