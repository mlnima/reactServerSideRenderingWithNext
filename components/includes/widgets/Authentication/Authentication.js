import React from 'react';
import LoggedOutItemsMenu from "./LoggedOutItemsMenu/LoggedOutItemsMenu";
import LoggedInItemsForMenu from "./LoggedInItemsForMenu/LoggedInItemsForMenu";
import {useSelector} from 'react-redux';
import styled from "styled-components";

const AuthenticationStyledDiv = styled.div`
  .logged-out-items, .logged-in-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .btn-transparent-light {
      //display: flex;
      //flex-direction: column;
      //justify-content: center;
      //align-items: center;
      //font-size: 12px;
      //background-color: transparent;
      //border: none;
      margin: 0 5px;
      //padding: 5px 10px;
     // color: var(--navigation-text-color, #ccc);
      

      //.logged-in-item-profile-image {
      //  width: 25px;
      //  height: 25px;
      //  border-radius: 50%;
      //}
    }
  }

  @media only screen and (min-width: 768px) {
    .logged-out-items, .logged-in-items {
      .logged-in-item, .logged-out-item {
        font-size: 14px;
      }
    }
  }
`

const Authentication = () => {
    const loggedIn = useSelector(state => state.user.loggedIn)
    return (

        <AuthenticationStyledDiv className='auth-buttons'>
            {loggedIn ? <LoggedInItemsForMenu position='topBar'/> : <LoggedOutItemsMenu position='topBar'/>}
        </AuthenticationStyledDiv>

    );
};

export default Authentication;
