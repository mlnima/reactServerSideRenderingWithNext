import React, {useEffect} from 'react';
import UserPageActionButtons
    from "../../components/includes/userPageComponents/UserPageActionButtons/UserPageActionButtons";
import {useRouter} from "next/router";
import styled from "styled-components";
import useTranslation from 'next-translate/useTranslation'
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {UserPreviewImage} from "ui";
import {Store} from "typescript-types";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import {getUserPageDataAction} from "@store_toolkit/clientReducers/userReducers/getUserPageDataAction";

const UserPageStyledDiv = styled.div`
  color: var(--main-text-color);
  max-width: 940px;
  margin: auto;
  font-size: 12px;
  padding: 10px;

  .profile-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 0.5px solid var(--main-text-color);
    flex-direction: column;

    @media (min-width: 768px) {
      flex-direction: row;
    }

    .profile-header-info-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .follow-count {
        width: 100%;
        display: flex;
        justify-content: center;

        p {
          margin: 5px 10px;
        }
      }
    }
  }

  .profile-posts {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px 0;

    .profile-no-posts {
      border: 0.5px solid var(--main-text-color);
      border-radius: 50%;
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;

      svg {
        width: 75px;
        height: 75px;
      }
    }

    .profile-no-posts-title {
      color: var(--main-text-color);
      text-align: center;
    }
  }
`;

const UserPage = () => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {userData, userPageData, loggedIn} = useSelector(({user}: Store) => user);

    useEffect(() => {
        const timerId = setTimeout(() => {
            getUserPageData(userData?._id);
        }, 500);
        return () => {
            clearTimeout(timerId);
        };
    }, [loggedIn]);

    const getUserPageData = async (userWhoRequestIt?: string) => {
        try {
            dispatch(
                getUserPageDataAction({
                    username: router.query.username as string,
                    userWhoRequestIt,
                    fields: ['following', 'followers', 'blockList'],
                }),
            );
        } catch (err) {
            console.log(err);
        }
    };

    if (userPageData?._id && userPageData?.username) {
        return (
            <UserPageStyledDiv className="user-page main">
                <HeadSetter title={userPageData?.username}/>
                <div className="profile-header">
                    {!!userPageData?.profileImage && (
                        <UserPreviewImage imageUrl={userPageData?.profileImage?.filePath} size={150}/>
                    )}
                    <div className="profile-header-info-actions">
                        <h3>{userPageData?.username}</h3>

                        <UserPageActionButtons _id={userData?._id}/>
                        <div className="follow-count">
                            <p>
                                {t('common:Followers', {}, {fallback: 'Followers'})} :<span>{userPageData?.followersCount || 0}</span>
                            </p>
                            <p>
                                {t('common:Following', {}, {fallback: 'Following'})} :<span>{userPageData?.followingCount || 0}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="profile-posts">
                    <div className="profile-no-posts">
                        <FontAwesomeIcon
                            className="upload-profile-image-btn-svg"
                            icon={faCamera}
                            style={{width: 20, height: 20}}
                        />
                    </div>
                    <h2 className="profile-no-posts-title">No Post Yet</h2>
                    <p className="profile-no-posts-title">Coming Soon</p>
                </div>
            </UserPageStyledDiv>
        );
    } else return null;
};

export default UserPage;

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'userPageRightSidebar',
            'userPageLeftSidebar',
        ],
        {
            setHeadData: true,
            page: 'user'
        },
        store)

    return {
        props: {}
    }

})
