import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import Link from 'next/link'

const ProfileNavigation = props => {
    const contextData = useContext(AppContext);
    const [ navigationData, setNavigationData ] = useState({
        isOpen: false,
        style: {}
    });

    useEffect(() => {
        setNavigationData({
            ...navigationData,
            style: {
                backgroundColor: contextData.siteDesign.navigationBackgroundColor,
                color: contextData.siteDesign.navigationTextColor
            }
        })
    }, [ contextData.siteDesign ]);

    const onTabChangeHandler = e => {
        props.setState({
            ...props.state,
            activeTab: e.target.name
        })
    }

    return (
        <div className='profile-navigation' style={ navigationData.style }>
        <style jsx>{`
            .profile-navigation{
                display: flex;
                justify-content: center;
                flex-wrap:wrap;
                align-items: center;
            }
            .profile-navigation-item{
                 color: var(--navigation-text-color);
                 padding: 5px 10px;
                 margin: 5px;
            }
            .profile-navigation-item :hover{
             transition: .5s;
             transform: scale(1.1);
            }
            .profile-navigation-item :active{
                color: var(--navigation-background-color);
                background-color: var(--navigation-text-color);
            }
            @media only screen and (min-width: 768px) {
                .profile-navigation{
                    justify-content: flex-start;
                }
            }
        `}</style>
            <Link href='/profile' ><a style={ navigationData.style } className='profile-navigation-item'>Profile</a></Link>
            <Link href='/profile/posts' ><a style={ navigationData.style } className='profile-navigation-item'>Posts</a></Link>
            <Link href='/profile/friends' ><a style={ navigationData.style } className='profile-navigation-item'>Friends {contextData?.userData?.friends?.length || 0}</a></Link>
            <Link href='/profile/friendRequests' ><a style={ navigationData.style } className='profile-navigation-item'>Pending Requests {contextData?.userData?.pendingFriendRequests?.length || 0}</a></Link>
            <Link href='/profile/followers' ><a style={ navigationData.style } className='profile-navigation-item'>Followers {contextData?.userData?.followers?.length || 0}</a></Link>
            <Link href='/profile/following' ><a style={ navigationData.style } className='profile-navigation-item'>Following {contextData?.userData?.following?.length || 0}</a></Link>
            <Link href='/profile/inbox' ><a style={ navigationData.style } className='profile-navigation-item'>Inbox {contextData?.userData?.inbox?.length || 0}</a></Link>
            <Link href='/profile/blockList' ><a style={ navigationData.style } className='profile-navigation-item'>Block List {contextData?.userData?.blockList?.length || 0}</a></Link>
        </div>
    );
};
export default withRouter(ProfileNavigation);


//
// <Link href={props.router ? {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfileInfo'}}:'/'}><a style={ navigationData.style } className='profile-navigation-item'>Profile</a></Link> --
// <Link href={props.router ? {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfilePosts'}}:'/'}><a style={ navigationData.style } className='profile-navigation-item'>Posts</a></Link>  --
// <Link href={props.router ? {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfileFriendsList'}}:'/'}><a style={ navigationData.style } className='profile-navigation-item'>Friends {contextData?.userData?.friends?.length || 0}</a></Link> --
// <Link href={props.router ? {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfilePendingFriendRequests'}}:'/'}><a style={ navigationData.style } className='profile-navigation-item'>Pending Requests {contextData?.userData?.pendingFriendRequests?.length || 0}</a></Link>--
// <Link href={props.router ? {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfileFollowersList'}}:'/'}><a style={ navigationData.style } className='profile-navigation-item'>followers {contextData?.userData?.followers?.length || 0}</a></Link> --
// <Link href={props.router ? {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfileFollowingList'}}:'/'}><a style={ navigationData.style } className='profile-navigation-item'>Following {contextData?.userData?.following?.length || 0}</a></Link> --
// <Link href={props.router ? {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfileMessages'}}:'/'}><a style={ navigationData.style } className='profile-navigation-item'>Inbox {contextData?.userData?.inbox?.length || 0}</a></Link>
// <Link href={props.router ? {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfileBlockList'}}:'/'}><a style={ navigationData.style } className='profile-navigation-item'>Block List {contextData?.userData?.blockList?.length || 0}</a></Link>