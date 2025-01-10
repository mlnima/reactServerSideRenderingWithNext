'use client';
import { UserPreviewImage } from '@repo/ui';
import React, { FC, SetStateAction } from 'react';
import ProfileImageWithEditing from '../PrfileImageWithEditing/ProfileImageWithEditing';
import UserPageActionButtons from '../UserPageActionButtons/UserPageActionButtons';
import ProfileStats from './ProfileStats';

interface IProps {
  isUserOwnProfile: boolean;
  userPageData: {
    username: string;
    _id: string;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    didRequesterFollowThisUser: boolean;
    profileImage: {
      filePath:string,
      _id:string
    };
  };
  setUserPageData: React.Dispatch<SetStateAction<any>>;
  dictionary: {
    [key: string]: string;
  };
}

const ProfileHeader: FC<IProps> = ({
  dictionary,
  isUserOwnProfile,
  userPageData,
  setUserPageData,
}) => {
  return (
    <div className={'profileHeader'}>
      {isUserOwnProfile ? (
        <ProfileImageWithEditing />
      ) : (
        <UserPreviewImage imageUrl={userPageData?.profileImage?.filePath} size={100} />
      )}
      <div className={'profileHeaderInfoActions'}>
        <h1>@{userPageData?.username}</h1>

        <UserPageActionButtons
          _id={userPageData?._id}
          isUserOwnProfile={isUserOwnProfile}
          didRequesterFollowThisUser={userPageData?.didRequesterFollowThisUser}
          username={userPageData?.username}
          profileImage={userPageData?.profileImage}
          setUserPageData={setUserPageData}
          dictionary={dictionary}
        />

        <ProfileStats
          dictionary={dictionary}
          postsCount={userPageData?.postsCount}
          followingCount={userPageData?.followingCount}
          followersCount={userPageData?.followersCount}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
