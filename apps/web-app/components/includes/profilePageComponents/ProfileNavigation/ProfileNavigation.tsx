import React, {useEffect, useState} from 'react';
import Link from 'next/link'
// import {useTranslation} from 'next-i18next';
import useTranslation from 'next-translate/useTranslation'
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Store} from "typescript-types";

const ProfileNavigationStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  .profile-navigation-items {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--main-text-color, #fff);

    .profile-navigation-item {
      color: var(--main-text-color, #fff);
      padding: 5px;
      margin: 5px;
      font-size: small;

      &:hover {
        transition: .5s;
        transform: scale(1.1);
      }

      &:active {
        color: var(--secondary-background-color, #181818);
        background-color: var(--main-text-color, #fff);
      }
    }
  }

  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
    .profile-navigation-item {
      font-size: medium;
    }
  }

`
const ProfileNavigation = () => {
    const {t} = useTranslation('common');
    const userData = useSelector(({user}: Store) => user?.userData)

    const [navigationData, setNavigationData] = useState({
        isOpen: false,
        style: {}
    });

    // const onTabChangeHandler = e => {
    //     props.setState({
    //         ...props.state,
    //         activeTab: e.target.name
    //     })
    // }

    return (
        <ProfileNavigationStyledDiv className='profile-navigation' style={navigationData.style}>

            <div className='profile-navigation-items'>
                {/*//@ts-ignore*/}
                <span>{userData?.followersCount || 0}</span>
                <Link href={'/profile/followers'} style={navigationData.style} className='profile-navigation-item'>
                        {t<string>('Followers')}
                </Link>
            </div>
            <div className='profile-navigation-items'>
                {/*//@ts-ignore*/}
                <span>{userData?.followingCount || 0}</span>
                <Link href={'/profile/following'} style={navigationData.style} className='profile-navigation-item'>
                        {t<string>('Following')}
                </Link>
            </div>


            {/*<Link href='/profile.json/inbox' ><a style={ navigationData.style } className='profile.json-navigation-item'>Inbox </a></Link>*/}
            {/*<Link href='/profile.json/blockList' ><a style={ navigationData.style } className='profile.json-navigation-item'>Block List</a></Link>*/}
        </ProfileNavigationStyledDiv>
    );
};
export default ProfileNavigation;

