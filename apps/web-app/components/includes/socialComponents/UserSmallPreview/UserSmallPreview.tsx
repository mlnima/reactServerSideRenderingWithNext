import React, {FC} from 'react';
import Link from "next/link";
import styled from "styled-components";

const UserSmallPreviewStyledSpan = styled.span`
  .user {
    list-style: none;
    padding: 5px 10px;
    width: clamp(100px, 300px, 600px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--secondary-background-color, #181818);
    margin: 10px auto;

    .user-profile-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .user-names-info {
      margin: 0 5px;

      p {
        color: var(--main-text-color, #fff);
      }
    }
  }
`

interface PropTypes {
    user: {
        username: string,
        profileImage: string,
        gender: string,
        name: string,
        lastName: string,
    }

}

const UserSmallPreview: FC<PropTypes> = ({user}) => {

    const getAvatarPath = (user) => {
        if (user?.profileImage?.filePath) {
            return user.profileImage.filePath;
        }
        if (user?.gender === 'male') {
            return '/asset/images/user/maleAvatar50.jpg';
        }
        if (user?.gender === 'female') {
            return '/asset/images/user/femaleAvatar50.jpg';
        }
        return '/asset/images/user/noGenderAvatar50.jpg';
    }

    return (
        <UserSmallPreviewStyledSpan>
            <Link href={{
                pathname: `/user/${user?.username}`,
                query: {username: user?.username}
            }}
                  as={`/user/${user?.username}`}
                  className='user'>

                <img src={getAvatarPath(user)} alt="user-profile-image" className="user-profile-image"/>
                <div className='user-names-info'>
                    <p>{user?.username}</p>
                    <p>{user?.name} {user?.lastName}</p>
                </div>

            </Link>
        </UserSmallPreviewStyledSpan>
    );
};
export default UserSmallPreview;
