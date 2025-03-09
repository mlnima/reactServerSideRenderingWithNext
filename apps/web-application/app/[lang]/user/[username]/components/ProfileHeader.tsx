'use client';
import { UserPreviewImage } from '@repo/ui';
import React, { FC, useEffect, useState } from 'react';
import ProfileImageWithEditing from './PrfileImageWithEditing/ProfileImageWithEditing';
import UserPageActionButtons from './UserPageActionButtons/UserPageActionButtons';
import ProfileStats from './UserPageContent/ProfileStats';
import { useAppSelector } from '@store/hooks';
import { IInitialUserPageData, IUserPageData } from '@repo/typescript-types';
import getLoadedUserPageData from '@lib/actions/database/operations/users/getLoadedUserPageData';
import './ProfileHeader.scss';

interface IProps {
  initialUserPageData: IInitialUserPageData;
  dictionary: {
    [key: string]: string;
  };
}

const ProfileHeader: FC<IProps> = (
  {
    initialUserPageData,
    dictionary,
  }) => {

  const [userPageData, setUserPageData] = useState<IUserPageData | null>(null);
  const { userData, loggedIn } = useAppSelector(({ user }) => user);

  useEffect(() => {
    setUserPageData(initialUserPageData);
  }, []);

  useEffect(() => {
    if (loggedIn && userData?._id !== initialUserPageData._id) {
      getUserPageData();
    }
  }, [loggedIn]);

  useEffect(() => {
    console.log(`userPageData=> `, userPageData);
  }, [userPageData]);

  const getUserPageData = async () => {
    try {
      if (!initialUserPageData._id) return;

      const { success, data } = await getLoadedUserPageData({
        userId: initialUserPageData._id,
        userWhoRequestIt: userData?._id as string,
      });


      if (!success || !data || !data.loadedUserPageData) {
        return;
      }

      setUserPageData({
        ...(userPageData || {}),
        ...data.loadedUserPageData,
      });

      return null;
    } catch {
      return null;
    }
  };

  return (
    <div className={'profileHeader'}>
      {userData?._id === userPageData?._id ? (
        <ProfileImageWithEditing />
      ) : (
        // @ts-expect-error: need fix
        <UserPreviewImage imageUrl={initialUserPageData?.profileImage?.filePath} size={100} />
      )}
      <div className={'profileHeaderInfoActions'}>
        <h1>@{initialUserPageData?.username}</h1>

        {userPageData &&
          <UserPageActionButtons
            _id={initialUserPageData?._id}
            userPageData={userPageData}
            getUserPageData={getUserPageData}
            dictionary={dictionary}
          />
        }

        <ProfileStats
          dictionary={dictionary}
          postsCount={initialUserPageData?.postsCount}
          followingCount={initialUserPageData?.followingCount}
          followersCount={initialUserPageData?.followersCount}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
