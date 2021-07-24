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
                .chatroom-message-area-message-username-time{
                 display: flex;
                 justify-content: space-between;
                 color:var(--navigation-text-color);
                 font-size:small;
                }
                .chatroom-message-area-message-text{
                  color:var(--navigation-text-color);
                  margin: 10px 20px;
                }
                .chatroom-message-area-message-image{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    
                }
                .chatroom-message-area-message-image:hover{
                    transition: .5s;
                    width: 50px;
                    height: 50px;
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
                    font-size:xx-small;
                    margin-left: 30px ;
                }
                `}</style>

            <img onClick={()=>{
                this.props.onUserInfoShowHandler(this.props.message.username,this.props.message.userId,this.props.message.profileImage)
            }

            } className='chatroom-message-area-message-image' src={this.props.message.profileImage||''} alt=""/>

            <div className='chatroom-message-area-message-data'>
                <span className='chatroom-message-area-message-username-time'>
                    {this.props.message.username}
                    <span className='chatroom-message-area-message-time'>{moment(new Date(this.props.message.createdAt), "YYYYMMDD").fromNow(false) }</span>
                </span>

                <p className='chatroom-message-area-message-text'>
                    {this.props.message.messageData}
                </p>


            </div>

        </div>
        );
    }
}

export default ChatRoomMessage;


// <div>{this.props.message}</div>