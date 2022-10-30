import Authentication from "../../widgets/Authentication/Authentication";
import styled from "styled-components";
import React, {FC} from "react";

const ChatRoomHeaderStyledHeader = styled.header`
  background-color: var(--navigation-background-color, #18181b);
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .chatroom-header-content {
    width: 100%;
    margin: 0 5px;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .chatroom-header-open-online-users-list-button {
      background-color: transparent;
      border: none;
      width: 24px !important;
      height: 24px !important;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;

      .users-icon {
        width: 24px !important;
        height: 24px !important;
        background-color: var(--navigation-text-color, #ccc);
        mask: url('/apps/mainNextApp/public/asset/images/icons/users-solid.svg') no-repeat center;
        -webkit-mask: url('/apps/mainNextApp/public/asset/images/icons/users-solid.svg') no-repeat center;
      }
    }
  }
`

interface ChatRoomHeaderPropTypes{
    onOnlineUserListVisibilityChangeHandler:any
}

const ChatRoomHeader:FC<ChatRoomHeaderPropTypes> = ({onOnlineUserListVisibilityChangeHandler}) => {
    return (
        <ChatRoomHeaderStyledHeader className='chatroom-header'>
            <div className='chatroom-header-content'>
                <Authentication/>
                <button className='chatroom-header-open-online-users-list-button' onClick={onOnlineUserListVisibilityChangeHandler}>
                    <span className={'users-icon'}/>
                </button>
            </div>
        </ChatRoomHeaderStyledHeader>
    );
};
export default ChatRoomHeader;
