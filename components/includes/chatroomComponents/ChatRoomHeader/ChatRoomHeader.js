import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import Authentication from "../../widgets/Authentication/Authentication";

const ChatRoomHeader = ({onOnlineUserListVisibilityChangeHandler}) => {
    return (
        <header className='chatroom-header'>
            <style jsx>{`
                .chatroom-header{
                  background-color: var(--navigation-background-color);
                  height: 50px;
                  padding:  10px;
                  display:flex;
                  justify-content : space-between;
                  align-items:center;
                }
                .chatroom-header-open-online-users-list-button{
                  background-color: transparent;
                  color: var(--navigation-text-color);
                  border:none
                }
            `}</style>
            <Authentication/>
            <button className='chatroom-header-open-online-users-list-button' onClick={onOnlineUserListVisibilityChangeHandler}>
                <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faUsers}/>
            </button>
        </header>
    );
};
export default ChatRoomHeader;
