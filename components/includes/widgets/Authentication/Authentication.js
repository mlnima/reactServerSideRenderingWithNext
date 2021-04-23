import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import LoggedOutItemsMenu from "./LoggedOutItemsMenu/LoggedOutItemsMenu";
import LoggedInItemsForMenu from "./LoggedInItemsForMenu/LoggedInItemsForMenu";
import styled from "styled-components";

let StyledDiv = styled.div`
  width: 100px;
  .logged-in-items , .logged-out-items{
    display: flex;
    align-items: center;
   .logged-in-item,.logged-out-item{
     margin: 0;
     width: 100%;
     svg{
       color: black;
       max-width: 15px;
       max-height: 15px;
     }
    }
  }
`

const Authentication = () => {
    const contextData = useContext(AppContext);
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        contextData.userData.username ? setLoggedIn(true) : setLoggedIn(false)
    }, [contextData.userData.username]);

    return (
        <StyledDiv className='auth-buttons'>
            {loggedIn ? <LoggedInItemsForMenu position='topBar'/> : <LoggedOutItemsMenu position='topBar'/>}

        </StyledDiv>
    );
};
export default Authentication;
