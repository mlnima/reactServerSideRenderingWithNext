import React, { PureComponent } from "react";
import moment from "moment";

class ChatRoomMessage extends PureComponent {
    render() {
        return (

        <div className='chatroom-message-area-message' >
            <style jsx>{`
                .chatroom-message-area-message{
                    display: flex;
                    justify-content: flex-start;
                    
                    align-items: center;
                    flex-wrap: wrap;
                    max-width: 70vw;
                    border-radius: 5px;
                    padding: 5px 10px;
                }
                .chatroom-message-area-message-username{
                 color:var(--navigation-text-color);
                 font-size:small;
                }
                .chatroom-message-area-message-text{
                color:var(--navigation-text-color);
                }
                .chatroom-message-area-message-image{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                .chatroom-message-area-message-data{
                background-color: var(--navigation-background-color);
                padding:  10px;
                margin:5px;
                   border-radius: 10px;
                }
                .chatroom-message-area-message-time{
                color:var(--navigation-text-color);
                font-size:x-small;
                }
                `}</style>

            <img className='chatroom-message-area-message-image' src={this.props.message.profileImage||''} alt=""/>

            <div className='chatroom-message-area-message-data'>
                                    <span className='chatroom-message-area-message-username'>
                    {this.props.message.username}
                </span>

                <p className='chatroom-message-area-message-text'>
                    {this.props.message.messageData}
                </p>

                <span className='chatroom-message-area-message-time'>{moment(new Date(this.props.message.createdAt), "YYYYMMDD").fromNow(false) }</span>
            </div>

        </div>
        );
    }
}

export default ChatRoomMessage;


// <div>{this.props.message}</div>