import React, {useState} from 'react';
import Link from 'next/link'
import {withTranslation} from "next-i18next";
import {useSelector} from "react-redux";

const ProfileNavigation = props => {

    const userData = useSelector(state => state.user.userData)

    const [ navigationData, setNavigationData ] = useState({
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
             color: var(--navigation-text-color, #ccc);
            }
            
            .profile-navigation-item{
                 color: var(--navigation-text-color, #ccc);
                 padding: 5px ;
                 margin: 5px;
                 font-size: small;
            }
            .profile-navigation-item :hover{
             transition: .5s;
             transform: scale(1.1);
            }
            .profile-navigation-item :active{
                color: var(--navigation-background-color,#18181b);
                background-color: var(--navigation-text-color, #ccc);
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

            <div className='profile-navigation-items'>
                <span>{userData.followersCount || 0}</span>
                <Link href='/profile/followers' >
                    <a style={ navigationData.style } className='profile-navigation-item'>
                    {props.t([`common:Followers`])}
                    </a>
                </Link>
            </div>
            <div className='profile-navigation-items'>
                <span>{userData.followingCount || 0}</span>
                <Link href='/profile/following' ><a style={ navigationData.style } className='profile-navigation-item'>{props.t([`common:Following`])} </a></Link>
            </div>


            {/*<Link href='/profile.json/inbox' ><a style={ navigationData.style } className='profile.json-navigation-item'>Inbox </a></Link>*/}
            {/*<Link href='/profile.json/blockList' ><a style={ navigationData.style } className='profile.json-navigation-item'>Block List</a></Link>*/}
        </div>
    );
};
export default withTranslation(['common'])(ProfileNavigation);

