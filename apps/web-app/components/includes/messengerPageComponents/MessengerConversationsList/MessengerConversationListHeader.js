import React from 'react'
import styled from "styled-components";
import Authentication from "../../widgets/Authentication/Authentication";

const MessengerConversationListHeaderStyledDiv = styled.div`
  background-color: var(--navigation-background-color, #18181b);
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .messenger-conversations-list-header-items{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 5px;
    padding: 0 5px;
    a{
      color: var(--main-text-color, #fff) ;
      margin: 0 10px;
    }
  }
`


const MessengerConversationListHeader = () => {
    return (
        <MessengerConversationListHeaderStyledDiv className='messenger-conversations-list-header'>
            <div className='messenger-conversations-list-header-items'>
                <Authentication/>
            </div>
        </MessengerConversationListHeaderStyledDiv>
    );
};
export default MessengerConversationListHeader;
