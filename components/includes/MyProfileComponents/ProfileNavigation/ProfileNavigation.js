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
            
            .profile-navigation-items{
             display: flex;
             flex-direction: column;
             justify-content: center;
             align-items: center;
             color: var(--navigation-text-color);
            }
            
            .profile-navigation-item{
                 color: var(--navigation-text-color);
                 padding: 5px ;
                 margin: 5px;
                 font-size: small;
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
                .profile-navigation-item{
                 font-size: medium;
               }
            }
        `}</style>
            {/*<Link href='/profile' ><a style={ navigationData.style } className='profile-navigation-item'>Profile</a></Link>*/}
            {/*<Link href='/profile/posts' ><a style={ navigationData.style } className='profile-navigation-item'>Posts</a></Link>*/}
            {/*<Link href='/profile/friends' ><a style={ navigationData.style } className='profile-navigation-item'>Friends </a></Link>*/}
            {/*<Link href='/profile/friendRequests' ><a style={ navigationData.style } className='profile-navigation-item'>Pending Requests</a></Link>*/}
            <div className='profile-navigation-items'>
                <span>{contextData.userData.followersCount || 0}</span>
                <Link href='/profile/followers' ><a style={ navigationData.style } className='profile-navigation-item'>Followers </a></Link>
            </div>
            <div className='profile-navigation-items'>
                <span>{contextData.userData.followingCount || 0}</span>
                <Link href='/profile/following' ><a style={ navigationData.style } className='profile-navigation-item'>Following </a></Link>
            </div>


            {/*<Link href='/profile/inbox' ><a style={ navigationData.style } className='profile-navigation-item'>Inbox </a></Link>*/}
            {/*<Link href='/profile/blockList' ><a style={ navigationData.style } className='profile-navigation-item'>Block List</a></Link>*/}
        </div>
    );
};
export default withRouter(ProfileNavigation);

