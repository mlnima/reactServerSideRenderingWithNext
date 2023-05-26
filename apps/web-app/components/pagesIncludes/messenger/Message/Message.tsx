// @ts-nocheck
import React, {PureComponent} from 'react';
import {formatDistance} from "date-fns";
import {Styles} from "./Message.styles";
import Link from "next/link";
import {UserPreviewImage} from "ui";
import AdminActionOnMessageMenu from "@components/pagesIncludes/chatroom/ChatRoomMessageArea/AdminActionOnMessageMenu";
import {ChatroomMessage} from "typescript-types";
import {IMessengerConversationMessage} from "typescript-types/src/messengerTypes/IMessengerConversationMessage";

interface IProps {
    message: IMessengerConversationMessage;
    isMine: boolean
}

const Message = ({messageData, isMine}) => {

console.log('messageData=> ',messageData)
    return (
        <Styles className={'message'} isMine={isMine}>
            {messageData?.type === 'eventLog' &&
                <p className={'chatroom-message-log'}>
                    {messageData?.content}
                </p>
            }


            <div className={'chatroom-message-data'}>
                {(!!messageData?.createdAt || !!messageData?.updatedAt) &&
                    <span className={'chatroom-message-username'}
                          title={formatDistance(
                              new Date(messageData?.createdAt || messageData?.updatedAt),
                              new Date(),
                              {addSuffix: true}
                          )}>
                    {messageData?.author?.username}
                  </span>}



                {!!messageData?.imageContent  &&
                    <img alt={'message'} src={messageData?.imageContent} className={'chatroom-message-image'}/>}
                {!!messageData?.audioContent  &&
                    <audio className={'audio-player'} src={messageData?.audioContent} controls/>}
                {!!messageData?.content &&
                    <p className={'chatroom-message-text'}>{messageData?.content}</p>}

            </div>
            <AdminActionOnMessageMenu
                chatroomId={messageData?.chatroom}
                messageId={messageData?._id}
            />

        </Styles>
    );

}

export default Message;


// <Styles className='message'
//         isMine={this?.props?.isMine}>
//
//     <div className='message-data'>
//         <p className='message-text'>
//             {this?.props?.message?.content}
//         </p>
//         <span className='message-date'>
//                     <p>
//                         {formatDistance(new Date(this?.props?.message?.createdAt), new Date(), {addSuffix: true})}
//                     </p>
//                 </span>
//     </div>
//
// </Styles>
