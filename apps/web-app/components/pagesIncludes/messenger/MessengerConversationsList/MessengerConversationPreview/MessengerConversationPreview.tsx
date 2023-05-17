import React, {FC, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons/faCircleUser";
import {useSelector} from "react-redux";
import {Store, User} from "typescript-types";
import {Styles} from "./MessengerConversationPreview.styles";
import {IMessengerConversation} from "typescript-types/src/messengerTypes/IMessengerConversation";
import {formatDistance} from 'date-fns'
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

interface IProps {
    conversationData: IMessengerConversation
    onSelectConversation: (conversationId: string) => void
}

const MessengerConversationPreview: FC<IProps> = ({conversationData,onSelectConversation}) => {

    const {userData} = useSelector(({user}: Store) => user)
    //@ts-ignore
    const [partnerData, setPartnerData] = useState<User>({})

    useEffect(() => {
        if (!!conversationData?.users?.length) {
            setPartnerData(conversationData?.users?.filter((user: any) => user._id !== userData?._id)[0])
        }
    }, [conversationData]);


    return (
        <Styles>
            <div onClick={()=>onSelectConversation(conversationData._id)} className={'messenger-conversation-preview '}>

                <div className={'profile-image'}>
                    {partnerData?.profileImage?.filePath ?
                        <img src={partnerData.profileImage.filePath} alt={partnerData.username}/> :
                        <FontAwesomeIcon icon={faCircleUser} style={{width: 50, height: 50}}/>
                    }
                </div>

                <div className={'info'}>
                    <div className={'username-date'}>
                        <span>{partnerData?.username}</span>
                        <span>
                            {formatDistance(
                                new Date(
                                    conversationData?.messages?.[0]?.updatedAt ||
                                    conversationData?.messages?.[0]?.createdAt ||
                                    conversationData.updatedAt ||
                                    conversationData?.createdAt),
                                new Date(),
                                {addSuffix: true}
                            )}
                        </span>
                    </div>
                    <div className={'seen-content'}>
                        <span>
                              <FontAwesomeIcon icon={faCheck}
                                               style={{width: 20, height: 20}}
                                               color={conversationData?.messages?.[0]?.isRead ? '#3376d0' : 'var(--secondary-text-color)'}
                              />
                        </span>
                        <p className={'content'}>
                            {conversationData?.messages?.[0]?.content || ''}
                        </p>
                    </div>

                </div>


                {/*<div className='messenger-conversation-content-preview'>*/}
                {/*    <div className='messenger-conversation-preview-username-date'>*/}
                {/*        <p className='messenger-conversation-preview-username'>*/}
                {/*            {partnerData?.username}*/}
                {/*        </p>*/}
                {/*        <p className='messenger-conversation-preview-date'>*/}
                {/*            {formatDistance(*/}
                {/*                new Date( conversationData.updatedAt || conversationData?.createdAt),*/}
                {/*                new Date(),*/}
                {/*                { addSuffix: true }*/}
                {/*            )}*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <p className='messenger-conversation-preview-last-message'>*/}
                {/*        {conversationData?.messages?.[0]?.content || ''}*/}
                {/*    </p>*/}
                {/*</div>*/}
            </div>
        </Styles>
    );
};
export default MessengerConversationPreview;
