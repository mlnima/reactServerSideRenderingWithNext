import React, {FC} from 'react';
import {formatDistance} from "date-fns";
import {Styles} from "./Message.styles";
import {IMessengerConversationMessage} from "typescript-types";

interface IProps {
    messageData: IMessengerConversationMessage;
    isMine: boolean
}

const Message:FC<IProps> = ({messageData, isMine}) => {

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
                    {messageData?.sender?.username}
                  </span>}

                {!!messageData?.imageContent  &&
                    <img alt={'message'} src={messageData?.imageContent} className={'chatroom-message-image'}/>}
                {!!messageData?.audioContent  &&
                    <audio className={'audio-player'} src={messageData?.audioContent} controls/>}
                {!!messageData?.content &&
                    <p className={'chatroom-message-text'}>{messageData?.content}</p>}

            </div>
        </Styles>
    );

}

export default Message;

