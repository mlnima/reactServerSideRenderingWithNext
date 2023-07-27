import styled from "styled-components";

interface  IProps {
    isConversationsMenuOpen: boolean,
    isActiveConversation: boolean,
    isMaximized: boolean;
}
export const Styles = styled.main<IProps>`
  ${({isMaximized}) =>
          isMaximized ? `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      // bottom: 0;
      z-index: 11;
  ` : ''}

  width: 100%;
  height: 100%;

  .inner-content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    background-color: var(--tertiary-background-color, #272727);
    
    grid-template-areas: ' ${({isConversationsMenuOpen,isActiveConversation}) => {
      if (isConversationsMenuOpen && !isActiveConversation){
        return 'conversationControl'
      } else if (isConversationsMenuOpen && isActiveConversation){
        return 'messaging'
      } else if (!isConversationsMenuOpen && isActiveConversation){
        return 'messaging'
      }
    }}';

    // return isConversationsMenuOpen ? 'conversationControl' : 'messaging'

    .conversations-controls {
      grid-area: conversationControl;
      width: 100%;
      //height: 100%;
      display: ${({isConversationsMenuOpen,isActiveConversation}) => isConversationsMenuOpen && !isActiveConversation ? 'grid ' : 'none'};
      grid-template-columns: 1fr;
      grid-template-rows: 50px 1fr;
    }

    .messaging {
      width: 100%;
      grid-area: messaging;
      display: ${({isConversationsMenuOpen,isActiveConversation}) => isConversationsMenuOpen && !isActiveConversation ? 'none ' : 'grid'};
      grid-template-rows: 50px 1fr 60px;
    }
    


  }

  .inner-content-not-logged-in{
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .messenger-page-register-page-link {
    color: var(--primary-text-color,#fff);
  }

  @media only screen and (min-width: 768px) {

    .inner-content {
      grid-template-columns: 300px 1fr;
      grid-template-areas: 'conversationControl messaging';
      .messaging,.conversations-controls{
        display: grid;
      }
    }
  }
`

// grid-template-areas: 'MessengerHeader'
// ' ${({isConversationsMenuOpen}) => {
// return isConversationsMenuOpen ? 'messagingConversationsList' : 'messagingArea'
// }}';