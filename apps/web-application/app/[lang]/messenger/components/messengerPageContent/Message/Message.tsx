import React, {FC} from 'react';
import {formatDistance} from "date-fns";
import {IMessengerConversationMessage} from "typescript-types";
import './Message.styles.scss'
import ReactAudioPlayer from "@components/ReactAudioPlayer/ReactAudioPlayer";

interface IProps {
    messageData: IMessengerConversationMessage;
    isMine: boolean
}

const Message: FC<IProps> = ({messageData, isMine}) => {

    return (
        <div className={`message ${isMine ? 'myMessage' : ''}`}>
            {messageData?.type === 'eventLog' &&
                <p className={'messengerLog'}>
                    {messageData?.content}
                </p>
            }
            <div className={'messengerMessageData'}>
                {!!messageData?.createdAt &&
                    <span className={'messengerMessageDate'}>
                    {!!messageData?.createdAt && formatDistance(
                        new Date(messageData?.createdAt || messageData?.updatedAt),
                        new Date(),
                        {addSuffix: true})}
                  </span>}


                {!!messageData?.imageContent &&
                    <img alt={'message'} src={messageData?.imageContent} className={'messengerMessageImage'}/>}
                {/*{!!messageData?.audioContent &&*/}
                {/*    <audio className={'audioPlayer'} src={messageData?.audioContent} controls/>}*/}
                {!!messageData?.audioContent &&
                    <ReactAudioPlayer  src={messageData?.audioContent} showControls={true}/>}
                {!!messageData?.content &&
                    <p className={'messengerMessageText'}>{messageData?.content}</p>}

            </div>
        </div>
    );

}

export default Message;
//
