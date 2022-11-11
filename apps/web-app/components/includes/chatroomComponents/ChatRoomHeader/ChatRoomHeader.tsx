import Authentication from "../../widgets/Authentication/Authentication";
import styled from "styled-components";
import React, {FC} from "react";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

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
                    <SvgRenderer svgUrl={'/asset/images/icons/users-solid.svg'}
                                 size={24}
                                 customClassName={'users-icon'}
                                 color={'var(--main-text-color, #fff)'}/>
                </button>
            </div>
        </ChatRoomHeaderStyledHeader>
    );
};
export default ChatRoomHeader;
