'use client';
import React, {FC, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons/faCircleUser";
import {User} from "@repo/typescript-types";
import {IMessengerConversation} from "@repo/typescript-types";
import {formatDistance} from 'date-fns'
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {useAppSelector} from "@store/hooks";
import './MessengerConversationPreview.styles.scss'
import {useRouter} from "next/navigation";
import {UserPreviewImage} from "@repo/ui";

interface IProps {
    conversationData: IMessengerConversation
}

const MessengerConversationPreview: FC<IProps> = ({conversationData}) => {
    const {push} = useRouter()
    const {userData} = useAppSelector(({user}) => user)
    //@ts-ignore
    const [partnerData, setPartnerData] = useState<User>({})

    useEffect(() => {
        if (!!conversationData?.users?.length) {
            setPartnerData(conversationData?.users?.filter((user: any) => user._id !== userData?._id)[0])
        }
    }, [conversationData]);


    return (
        <div className={'messengerConversationPreview'}>
            <div className={'messenger-conversation-preview'}
                 onClick={() => push(`/messenger?_id=${conversationData._id}`)}>

                <div className={'profile-image'}>
                    {/*{partnerData?.profileImage?.filePath ?*/}
                    {/*    <img src={partnerData.profileImage.filePath} alt={partnerData.username}/> :*/}
                    {/*    <FontAwesomeIcon icon={faCircleUser} style={{width: 50, height: 50}}/>*/}
                    {/*}*/}
                    {partnerData?.profileImage?.filePath ?
                        <UserPreviewImage imageUrl={partnerData.profileImage.filePath} size={50}/> :
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
                                               color={conversationData?.messages?.[0]?.isRead ?
                                                   '#3376d0' :
                                                   'var(--secondary-text-color,#b3b3b3)'}
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
        </div>
    );
};
export default MessengerConversationPreview;
