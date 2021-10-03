import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const StyledChatRoomOnlineUsersListItemMoreInfoDiv = styled.div`
  .chatroom-online-users-list-item-more-info-link{
    color:   var(--navigation-text-color, #ccc) ;
  }
`

// color:   ${ moreInfo ?  'var(--navigation-background-color,#18181b)' : 'var(--navigation-text-color, #ccc)' } ;

const ChatRoomOnlineUsersListItemMoreInfo = ({username,moreInfo}) => {

    if (moreInfo){
        return (
            <StyledChatRoomOnlineUsersListItemMoreInfoDiv className='chatroom-online-users-list-item-more-info'>
                <Link href={`/user/${username}`} as={`/user/${username}`} >
                    <a className='chatroom-online-users-list-item-more-info-link'>
                        <FontAwesomeIcon style={{width: '30px', height: '30px'}} icon={faUserCircle}  aria-label='view profile'/>
                    </a>
                </Link>
            </StyledChatRoomOnlineUsersListItemMoreInfoDiv>
        );
    }else return null

};

export default ChatRoomOnlineUsersListItemMoreInfo;
