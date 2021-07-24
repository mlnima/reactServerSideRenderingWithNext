import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";

const ChatRoomOnlineUsersListItemMoreInfo = ({username,moreInfo}) => {

    if (moreInfo){
        return (
            <div className='chatroom-online-users-list-item-more-info'>
                    <style jsx>{`
                    .chatroom-online-users-list-item-more-info{
                    
                    }
                    .chatroom-online-users-list-item-more-info-link{
                        color:  ${ moreInfo ?  'var(--navigation-background-color)' : 'var(--navigation-text-color)' } ;
                    }
                `}</style>
                <Link href={`/user/${username}`} as={`/user/${username}`} >
                    <a className='chatroom-online-users-list-item-more-info-link'>
                        <FontAwesomeIcon style={{width: '30px', height: '30px'}} icon={faUserCircle}  aria-label='view profile'/>
                    </a>
                </Link>
            </div>
        );
    }else return null

};

export default ChatRoomOnlineUsersListItemMoreInfo;
