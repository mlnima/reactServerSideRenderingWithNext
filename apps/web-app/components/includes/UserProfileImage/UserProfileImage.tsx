import React, {FC, memo, useMemo} from "react";
import styled from "styled-components";
import Link from "next/link";
import ImageContent from "@components/includes/UserProfileImage/ImageContent";
import {useAppSelector} from "@store_toolkit/hooks";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .user-info-profile-button-image {
    border-radius: 50%;
    box-sizing: border-box;
  }

  .user-info-profile-button-icon {
    cursor: pointer;
    color: var(--secondary-text-color,#ccc);
  }
`

interface IProps {
    size?: number,
    profileRedirect?: boolean,
}

const UserProfileImage: FC<IProps> = ({size, profileRedirect}) => {

    const {userData, loggedIn} = useAppSelector(({user}) => user)

    const profileImage = useMemo(() => userData?.profileImage?.filePath,[userData?.profileImage?.filePath])

    return (
        <Style className={'user-profile-image'}>
            {profileRedirect && loggedIn ?
                <Link href={`/profile`}><ImageContent profileImage={profileImage} size={size}/></Link> :
                <ImageContent profileImage={userData?.profileImage?.filePath} size={size}/>
            }
        </Style>
    )
};
export default memo(UserProfileImage);

// width: ${({size}) => size || 48}px;
// height: ${({size}) => size || 48}px;