import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import LoggedOutItemsMenu from "./LoggedOutItemsMenu/LoggedOutItemsMenu";
import LoggedInItemsForMenu from "./LoggedInItemsForMenu/LoggedInItemsForMenu";
import styled from "styled-components";

let StyledDiv = styled.div`
  .logged-in-items , .logged-out-items{
    display: flex;
    align-items: center;
   .logged-in-item,.logged-out-item{
     margin: 0;
     width: 100%;
     svg{
     
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
        <div className='auth-buttons'>
            <style jsx>{`
              .auth-buttons{
                width: 100px;
                
                 }
               svg{
                   color: var(--navigation-text-color);
                   max-width: 15px;
                   max-height: 15px;
                  }
           `}</style>
            {loggedIn ? <LoggedInItemsForMenu position='topBar'/> : <LoggedOutItemsMenu position='topBar'/>}

        </div>
    );
};
export default Authentication;
