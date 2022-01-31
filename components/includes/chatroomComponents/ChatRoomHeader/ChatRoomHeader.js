import Authentication from "../../widgets/Authentication/Authentication";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";

const ChatRoomHeaderStyledHeader = styled.header`
  background-color: var(--navigation-background-color,#18181b);
  height: 56px;
  display:flex;
  justify-content : space-between;
  align-items:center;
  .chatroom-header-content{
    width: 100%;
    margin: 0 5px;
    padding: 0 5px;
    display:flex;
    justify-content : space-between;
    align-items:center;
    .chatroom-header-open-online-users-list-button{
      background-color: transparent;
      color: var(--navigation-text-color, #ccc);
      border:none;
      padding: 5px ;
    }
  }
`

const ChatRoomHeader = ({onOnlineUserListVisibilityChangeHandler}) => {
    const {t} = useTranslation('common');
    return (
        <ChatRoomHeaderStyledHeader className='chatroom-header'>
            <div className='chatroom-header-content'>
                <Authentication/>
                <button className='chatroom-header-open-online-users-list-button' onClick={onOnlineUserListVisibilityChangeHandler}>
                    {t(`Users`)}
                </button>
            </div>
        </ChatRoomHeaderStyledHeader>
    );
};
export default ChatRoomHeader;
