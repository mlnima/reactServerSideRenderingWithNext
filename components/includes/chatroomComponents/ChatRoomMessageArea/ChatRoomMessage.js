import React, {PureComponent} from "react";
import moment from "moment";

import styled from "styled-components";

const ChatRoomLogMessageStyledDiv = styled.div`
  background-color: var(--navigation-background-color, #18181b);

  .chatroom-message-area-message-log {
    color: var(--navigation-text-color, #ccc);
    padding: 5px;
    margin: 5px;
    text-align: center;
    overflow-wrap: break-word;
  }
`



const ChatRoomMessageStyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  max-width: 70vw;
  border-radius: 5px;
  padding: 5px 10px;
  .chatroom-message-area-message-username-time {
    display: flex;
    justify-content: space-between;
    color: var(--navigation-text-color, #ccc);
    font-size: small;
  }

  .chatroom-message-area-message-text {
    color:var(--navigation-text-color, #ccc);
    margin: 10px 20px;
    overflow-wrap: break-word;
  }

  .chatroom-message-area-message-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;

  }

  .chatroom-message-area-message-image:hover {
    transition: .5s;
    width: 50px;
    height: 50px;
    border-radius: 50%;

  }

  .chatroom-message-area-message-data {
    background-color: var(--navigation-background-color, #18181b);
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
  }

  .chatroom-message-area-message-time {
    color: var(--navigation-text-color, #ccc);
    font-size: xx-small;
    margin-left: 30px;
  }
`

class ChatRoomMessage extends PureComponent {
    render() {
        if (this?.props?.message?.type === 'log') {
            return (
                <ChatRoomLogMessageStyledDiv className='chatroom-message-area-message' type={this?.props?.message?.type}>
                    <p className='chatroom-message-area-message-log'>{this?.props?.message?.username} joined the room</p>
                </ChatRoomLogMessageStyledDiv>
            )
        } else return (
            <ChatRoomMessageStyledDiv className='chatroom-message-area-message'>
                <img onClick={() => {

                    this?.props?.onShowProfileHandler(this?.props?.message?.username, this?.props?.message?.id, this?.props?.message?.profileImage)
                }} className='chatroom-message-area-message-image' src={this?.props?.message?.profileImage ? this?.props?.message?.profileImage : '/public/asset/images/user/noGenderAvatar50.jpg'} alt="profileImage"/>

                <div className='chatroom-message-area-message-data'>
                    <span className='chatroom-message-area-message-username-time'>
                    {this?.props?.message?.username}
                        <span className='chatroom-message-area-message-time'>{moment(new Date(this?.props?.message?.createdAt), "YYYYMMDD").fromNow(false)}</span>
                    </span>
                    <p className='chatroom-message-area-message-text'>
                        {this?.props?.message?.messageData}
                    </p>
                </div>
            </ChatRoomMessageStyledDiv>
        );
    }
}

export default ChatRoomMessage;


// <div>{this.props.message}</div>