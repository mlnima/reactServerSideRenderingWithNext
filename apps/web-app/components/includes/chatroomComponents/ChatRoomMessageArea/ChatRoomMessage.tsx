import React, {PureComponent} from "react";
import {formatDistance} from 'date-fns'
import styled from "styled-components";
import {ChatroomMessage} from "typescript-types";
import UserPreviewImage from "ui/src/UserPreviewImage";
import Link from "next/link";

const ChatRoomLogMessageStyledDiv = styled.div`
  background-color: var(--secondary-background-color, #181818);

  .chatroom-message-area-message-log {
    color: var(--main-text-color, #fff);
    padding: 5px;
    margin: 5px;
    text-align: center;
    overflow-wrap: break-word;
  }
`


const ChatRoomMessageStyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  max-width: 70vw;
  border-radius: 5px;
  padding: 5px 10px;
  box-sizing: border-box;

  .user-profile-image {
    background-color: transparent;
    border: none;
    outline: none;
    margin-bottom: 7px;
  }
  
  .chatroom-message-area-message-data {
    background-color: var(--secondary-background-color, #181818);
    padding: 10px;
    margin: 5px;
    box-sizing: border-box;
    border-radius: 10px;
    .chatroom-message-area-message-username {
      display: flex;
      justify-content: space-between;
      color: var(--main-text-color, #fff);
      font-size: small;
    }

    .chatroom-message-area-message-text {
      color: var(--main-text-color, #fff);
      margin: 10px 20px;
      overflow-wrap: break-word;
    }
  }
`

interface ChatRoomMessagePropTypes {
    locale: string,
    message: ChatroomMessage,
    onShowProfileHandler: any
}

class ChatRoomMessage extends PureComponent<ChatRoomMessagePropTypes> {

    render() {

        if (this?.props?.message?.type === 'log') {
            return (
                <ChatRoomLogMessageStyledDiv className='chatroom-message-area-message'>
                    <p className='chatroom-message-area-message-log'>
                        {this?.props?.message?.username}
                        joined the room
                    </p>
                </ChatRoomLogMessageStyledDiv>
            )
        } else if(!!this?.props?.message?.username) {
            return (
                <ChatRoomMessageStyledDiv className='chatroom-message-area-message'>

                    <Link className={'user-profile-image'} href={`/user/${this?.props?.message?.username}`}>
                        <UserPreviewImage imageUrl={this?.props?.message?.profileImage} size={24}/>
                    </Link>

                    <div className='chatroom-message-area-message-data'>
                    <span className='chatroom-message-area-message-username'
                          title={formatDistance(new Date(this?.props?.message?.createdAt), new Date(), {addSuffix: true})}>
                    {this?.props?.message?.username}
                    </span>
                        <p className='chatroom-message-area-message-text'>
                            {this?.props?.message?.messageData}
                        </p>
                    </div>
                </ChatRoomMessageStyledDiv>
            );
        }
    }
}

export default ChatRoomMessage;


// <div>{this.props.message}</div>
//