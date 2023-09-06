'use client';
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {FC, useEffect, useState} from "react";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons/faArrowDownWideShort";
import {IMessengerConversation, User} from "typescript-types";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {initialOutGoingCallAction} from "@store/reducers/mediaConnectionReducer";
import './MessengerHeader.styles.scss'

interface IProps {
    conversationsMenuTriggerHandler: (value: boolean) => void,
    activeConversation: IMessengerConversation,
    autoScroll: boolean,
    setAutoScroll: Function,
}

const MessengerHeader: FC<IProps> = ({activeConversation,autoScroll,setAutoScroll}) => {
    const dispatch = useAppDispatch();
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
        <div id={'messengerHeader'} className='outerContent'>
            {!!activeConversation?._id &&

                <div className='messenger-header-content innerContent'>


                    <div className="button-group left">

                        <button onClick={()=>push('/messenger')}
                                className={'btn btn-transparent mobile-only'}>
                            <FontAwesomeIcon icon={faArrowLeft} style={{width: 25, height: 25}}/>
                        </button>

                        <button onClick={() => setAutoScroll(!autoScroll)}
                                className={`chatroomTopBarActionButton ${autoScroll ? 'chatroomTopBarActionButton' :''}`}
                        >
                            <FontAwesomeIcon icon={faArrowDownWideShort}/>
                        </button>
                        {/*<img onClick={() => router.push(`/user/${username}`)}*/}
                        {/*     src={profileImage?.filePath ? profileImage?.filePath : '/asset/images/user/noGenderAvatar150.jpg'}*/}
                        {/*     alt="messenger-conversation-header-profile-image"*/}
                        {/*     className="messenger-conversation-header-profile-image"/>*/}
                        <p onClick={() => router.push(`/user/${partnerData?.username || ''}`)}
                           className='messenger-conversation-header-username'>{partnerData?.username || ''}</p>
                    </div>

                    {/*<div className="button-group right">*/}
                    {/*    <button className={'btn btn-transparent'}*/}
                    {/*            onClick={() => dispatch(initialOutGoingCallAction('video'))}>*/}
                    {/*        <FontAwesomeIcon icon={faVideo} style={{width: 25, height: 25}}/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                </div>
            }
        </div>
    )
        ;
};
export default MessengerHeader;
