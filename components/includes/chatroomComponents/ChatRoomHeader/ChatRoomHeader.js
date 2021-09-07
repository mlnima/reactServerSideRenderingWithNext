import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import Authentication from "../../widgets/Authentication/Authentication";
import {withTranslation} from "next-i18next";

const ChatRoomHeader = ({onOnlineUserListVisibilityChangeHandler,t}) => {
    return (
        <header className='chatroom-header'>
            <style jsx>{`
                .chatroom-header{
                  background-color: var(--navigation-background-color);
                  height: 48px;
                  //padding:  10px;
                  display:flex;
                  justify-content : space-between;
                  align-items:center;
                }
                .chatroom-header-open-online-users-list-button{
                  background-color: transparent;
                  color: var(--navigation-text-color);
                  border:none;
                   padding: 5px ;
                }
            `}</style>
            <Authentication/>
            <button className='chatroom-header-open-online-users-list-button' onClick={onOnlineUserListVisibilityChangeHandler}>
                {t(`common:Users`)}
            </button>
        </header>
    );
};
export default withTranslation(['common'])(ChatRoomHeader);
