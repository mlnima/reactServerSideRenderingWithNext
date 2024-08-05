'use client';
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {FC, useEffect, useState} from "react";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons/faArrowDownWideShort";
import {IMessengerConversation, User} from "@repo/typescript-types";
import { useAppSelector} from "@store/hooks";
import './MessengerHeader.styles.scss';
import {faCircleUser} from "@fortawesome/free-solid-svg-icons/faCircleUser";
import {UserPreviewImage} from "@repo/ui";

interface IProps {
    activeConversation: IMessengerConversation,
    autoScroll: boolean,
    setAutoScroll: Function,
}

const MessengerHeader: FC<IProps> = ({activeConversation,autoScroll,setAutoScroll}) => {

    const {push} = useRouter()
    const {userData} = useAppSelector(({user}) => user)
    const [partnerData, setPartnerData] = useState<User | null>(null)


    useEffect(() => {
        if (!!activeConversation?.users?.length) {
            setPartnerData(activeConversation?.users?.filter((user: any) => user._id !== userData?._id)[0])
        }
    }, [activeConversation]);

    const router = useRouter()

    return (
        <div id={'messengerHeader'}>
            {!!activeConversation?._id &&

                <div className='messengerHeaderContent'>


                    <div className="messengerHeaderLeftContent">

                        <button onClick={()=>push('/messenger')}
                                className={'btn btn-transparent mobile-only'}>
                            <FontAwesomeIcon icon={faArrowLeft} style={{width: 25, height: 25}}/>
                        </button>

                        <button onClick={() => setAutoScroll(!autoScroll)}
                                style={{
                                    color: autoScroll ?
                                        'var(--primary-active-color, #f90)' :
                                        'var(--secondary-text-color, #b3b3b3)'
                                }}
                                className={`chatroomTopBarActionButton ${autoScroll ? 'chatroomTopBarActionButton' :''}`}
                        >
                            <FontAwesomeIcon icon={faArrowDownWideShort}/>
                        </button>
                        {/*{partnerData?.profileImage?.filePath ?*/}
                        {/*    <img src={partnerData.profileImage.filePath}*/}
                        {/*         alt={partnerData.username}*/}
                        {/*         style={{width: 25, height: 25}}/> :*/}
                        {/*    <FontAwesomeIcon icon={faCircleUser} style={{width: 25, height: 25}}/>*/}
                        {/*}*/}
                        {partnerData?.profileImage?.filePath ?
                            <UserPreviewImage imageUrl={partnerData.profileImage.filePath} size={25}/> :
                            <FontAwesomeIcon icon={faCircleUser} style={{width: 25, height: 25}}/>
                        }
                        <p onClick={() => router.push(`/user/${partnerData?.username || ''}`)}
                           className='messenger-conversation-header-username'>{partnerData?.username || ''}</p>
                    </div>

                    <div className="messengerHeaderRightContent">
                        {/*<button className={'btn btn-transparent'}*/}
                        {/*        onClick={() => dispatch(initialOutGoingCallAction('video'))}>*/}
                        {/*    <FontAwesomeIcon icon={faVideo} style={{width: 25, height: 25}}/>*/}
                        {/*</button>*/}

                        {/*<button className={`chatroomTopHeaderActionButton`}*/}
                        {/*        style={{*/}
                        {/*            color: isMaximized ? 'var(--primary-active-color, #f90)' :*/}
                        {/*                'var(--secondary-text-color, #b3b3b3)'*/}
                        {/*        }}*/}
                        {/*        onClick={() => updatePreference('isMaximized', !isMaximized)}>*/}
                        {/*    <FontAwesomeIcon icon={isMaximized ? faMinimize : faMaximize} style={{width: 25, height: 25}}/>*/}
                        {/*</button>*/}
                    </div>
                </div>
            }
        </div>
    )
        ;
};
export default MessengerHeader;
