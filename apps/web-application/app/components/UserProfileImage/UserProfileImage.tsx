'use client';
import React, {FC, memo} from "react";
import Link from "next/link";
import ImageContent from "./ImageContent";
import {useAppSelector} from "@store/hooks";
import Csr from "@components/global/Csr";

interface UserProfileImagePropTypes {
    size?: number,
    profileRedirect?: boolean,
}

const UserProfileImage: FC<UserProfileImagePropTypes> = ({size, profileRedirect}) => {

    const {userData} = useAppSelector(({user}) => user)
    const {loggedIn} = useAppSelector(({user}) => user)

    return (
        <div className={'user-profile-image'}>
            <Csr>
                {profileRedirect && loggedIn ?
                    <Link href={`/user/${userData?.username}`}>
                        <ImageContent profileImage={userData?.profileImage?.filePath} size={size || 48}/>
                    </Link> :
                    <ImageContent profileImage={userData?.profileImage?.filePath} size={size || 48}/>
                }
            </Csr>
        </div>
    )


};
export default memo(UserProfileImage);
