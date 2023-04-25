import styled from "styled-components";

interface  IProps {
    isConversationsMenuOpen: boolean,
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
    //justify-content: center;

    background-color: var(--tertiary-background-color, #272727);

    grid-template-areas: ' ${({isConversationsMenuOpen}) => {
        console.log('isConversationsMenuOpen=> ',isConversationsMenuOpen)
      return isConversationsMenuOpen ? 'conversationControl ' : 'messaging'
    }}';

    .conversations-controls {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 50px 1fr;
    }

    .messaging {
      grid-area: messaging;
      display: grid;
      grid-template-rows: 50px 1fr 60px;
    }

    .messaging {

    }

    .conversations-controls {
      grid-area: conversationControl;

    }

  }


  .messenger-page-register-page-link {
    color: var(--main-text-color);
  }

  @media only screen and (min-width: 768px) {

    .inner-content {
      grid-template-columns: 300px 1fr;
      grid-template-areas: 'conversationControl messaging';
    }
  }
`

// grid-template-areas: 'MessengerHeader'
// ' ${({isConversationsMenuOpen}) => {
// return isConversationsMenuOpen ? 'messagingConversationsList' : 'messagingArea'
// }}';