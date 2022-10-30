import React from 'react';
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
    background-color: var(--navigation-background-color, #18181b);
    margin: 10px auto;

    .user-profile-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .user-names-info {
      margin: 0 5px;

      p {
        color: var(--navigation-text-color, #ccc);
      }
    }
  }
`

const UserSmallPreview = ({username, role, profileImage, name, lastName, _id, gender}) => {
    return (
        <UserSmallPreviewStyledSpan>
            <Link href={{
                pathname: `/user/${username}`,
                query: {username}
            }}
                  as={`/user/${username}`}
                  className='user'
            >

                <img src={profileImage ? profileImage :
                    gender === 'male' ? '/public/asset/images/user/maleAvatar50.jpg' :
                        gender === 'female' ? '/public/asset/images/user/femaleAvatar50.jpg' :
                            '/public/asset/images/user/noGenderAvatar50.jpg'
                } alt="user-profile-image" className="user-profile-image"/>
                <div className='user-names-info'>
                    <p>{username}</p>
                    <p>{name} {lastName}</p>
                </div>

            </Link>
        </UserSmallPreviewStyledSpan>
    );
};
export default UserSmallPreview;
