import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import Link from 'next/link'
import styled from "styled-components";
let StyledDiv = styled.div`
  padding: 5px;
  button,a{
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 5px;
    &:hover{
      outline: none;
    }
  }

  a{
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 5px;
  }
`
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

    useEffect(() => {
        console.log(props)
    }, [ props ]);
    return (
        <StyledDiv className='profile-navigation' style={ navigationData.style }>
            <Link href={ props.router ?    {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfileInfo'}}:'/'}><a style={ navigationData.style }>Profile</a></Link>
            <Link href={props.router ? {pathname:props.router.pathname,query:{...props.router.query,tab:'MyProfilePosts'}}:'/'}><a style={ navigationData.style }>My Posts</a></Link>
        </StyledDiv>
    );
};
export default withRouter(ProfileNavigation);
