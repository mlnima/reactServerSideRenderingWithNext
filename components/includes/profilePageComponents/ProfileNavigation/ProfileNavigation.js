import React, {useState} from 'react';
import Link from 'next/link'
import {withTranslation} from "next-i18next";
import {useSelector} from "react-redux";
import styled from "styled-components";

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
    color: var(--navigation-text-color, #ccc);

    .profile-navigation-item {
      color: var(--navigation-text-color, #ccc);
      padding: 5px;
      margin: 5px;
      font-size: small;

      &:hover {
        transition: .5s;
        transform: scale(1.1);
      }

      &:active {
        color: var(--navigation-background-color, #18181b);
        background-color: var(--navigation-text-color, #ccc);
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
const ProfileNavigation = props => {

    const userData = useSelector(store => store?.user?.userData)

    const [navigationData, setNavigationData] = useState({
        isOpen: false,
        style: {}
    });


    const onTabChangeHandler = e => {
        props.setState({
            ...props.state,
            activeTab: e.target.name
        })
    }

    return (
        <ProfileNavigationStyledDiv className='profile-navigation' style={navigationData.style}>


            <div className='profile-navigation-items'>
                <span>{userData.followersCount || 0}</span>
                <Link href='/profile/followers'>
                    <a style={navigationData.style} className='profile-navigation-item'>
                        {props.t([`common:Followers`])}
                    </a>
                </Link>
            </div>
            <div className='profile-navigation-items'>
                <span>{userData.followingCount || 0}</span>
                <Link href='/profile/following'><a style={navigationData.style} className='profile-navigation-item'>{props.t([`common:Following`])} </a></Link>
            </div>


            {/*<Link href='/profile.json/inbox' ><a style={ navigationData.style } className='profile.json-navigation-item'>Inbox </a></Link>*/}
            {/*<Link href='/profile.json/blockList' ><a style={ navigationData.style } className='profile.json-navigation-item'>Block List</a></Link>*/}
        </ProfileNavigationStyledDiv>
    );
};
export default withTranslation(['common'])(ProfileNavigation);

