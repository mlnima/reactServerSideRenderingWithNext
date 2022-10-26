import Link from "next/link";
import styled from "styled-components";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import React from "react";

const StyledChatRoomOnlineUsersListItemMoreInfoDiv = styled.div`

`

//################################### Will Delete ##############################

const ChatRoomOnlineUsersListItemMoreInfo = ({username,moreInfo}) => {
    if (moreInfo){
        return (
            <StyledChatRoomOnlineUsersListItemMoreInfoDiv className='chatroom-online-users-list-item-more-info'>
                <Link href={`/user/${username}`} as={`/user/${username}`}
                      className='chatroom-online-users-list-item-more-info-link'
                      aria-label='view profile'>
                        <SvgRenderer svgUrl={'/public/asset/images/icons/user-solid.svg'}
                                     size={30}
                                     color={'var(--navigation-text-color, #ccc)'}/>
                </Link>
            </StyledChatRoomOnlineUsersListItemMoreInfoDiv>
        );
    }else return null
};

export default ChatRoomOnlineUsersListItemMoreInfo;
