import React, {FC} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import Link from "next/link";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  .user-info-profile-button-image {
    border-radius: 50%;
    width: ${({size}:UserProfileImageStylePropTypes)=> size || 48 }px;
    height:  ${({size}:UserProfileImageStylePropTypes)=> size || 48 }px;
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

const UserProfileImage: FC<UserProfileImagePropTypes> = ({size,profileRedirect}) => {

    const {_id, userData, loggedIn} = useSelector(({posts, user}: Store) => {
        return {
            _id: posts.post?._id,
            loggedIn: user.loggedIn,
            userData: user?.userData
        }
    })

    if (loggedIn) {
        return (
            <Style className={'user-profile-image'} size={size}>

                {userData?.profileImage ?
                    <Link href={`/user/${userData?.username}`}>
                        <a>
                            <img className={'user-info-profile-button-image'} src={userData?.profileImage}
                                 alt={'profile image'}/>
                        </a>
                    </Link> :
                    <SvgRenderer svgUrl={'/public/asset/images/icons/user-solid.svg'}
                                 size={size - 10 || 48}
                                 customClassName={'user-info-profile-button-icon'}
                                 color={' var(--auth-widget-text-color, #fff)'}
                    />
                }
            </Style>
        )
    } else {
        return (
            <Style className={'user-profile-image'} size={size}>

                <SvgRenderer svgUrl={'/public/asset/images/icons/user-solid.svg'}
                             size={size -10 || 48}
                             customClassName={'user-info-profile-button-icon'}
                             color={' var(--auth-widget-text-color, #fff)'}
                />
            </Style>
        )
    }


};
export default UserProfileImage;
