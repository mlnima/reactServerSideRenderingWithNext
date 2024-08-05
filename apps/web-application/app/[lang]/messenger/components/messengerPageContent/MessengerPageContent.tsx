'use client';
import React, {FC, useEffect, useRef, useState} from "react";
import {IPreference} from "../interfaces";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {clientAPIRequestGetAConversation, clientAPIRequestGetConversationsList} from "@repo/api-requests";
import socket from '@lib/web-socket-client';
import {useSearchParams, usePathname} from "next/navigation";
import {useIsMobile} from "@repo/react-hooker-lib";
import {deleteAConversationAction} from "@store/reducers/messengerActions/deleteAConversation";
import {loadOlderMessagesAction} from "@store/reducers/messengerActions/loadOlderMessagesAction";
import './MessengerPageContent.styles.scss'
import Link from "next/link";
import MessengerConversationsList from "./MessengerConversationsList/MessengerConversationsList";
import MessengerHeader from "./MessengerHeader/MessengerHeader";
import MessagingArea from "./MessagingArea/MessagingArea";
import MessengerMultiMediaInputBox from "./MessengerMultiMediaInputBox/MessengerMultiMediaInputBox";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinimize} from "@fortawesome/free-solid-svg-icons/faMinimize";
import {faMaximize} from "@fortawesome/free-solid-svg-icons/faMaximize";
import {IMessengerConversation} from "@repo/typescript-types";
import {headerSizeCalculator} from "@repo/shared-util";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import ConversationsControlsHeader from "./ConversationsControlsHeader/ConversationsControlsHeader";

interface IProps {
    dictionary: {
        [key: string]: string
    }
}

const messengerPageContent: FC<IProps> = ({dictionary}) => {
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const messageAreaRef = useRef<null | HTMLDivElement>(null)
    const hasRun = useRef(false);
    const [conversationsList, setConversationsList] = useState([])
    const [autoScroll, setAutoScroll] = useState<boolean>(true)

    const [activeConversation, setActiveConversation] = useState<IMessengerConversation>({
        _id: '',
        messages: [],
        users: [],
        status: 'active',
        createdAt: null,
        updatedAt: null,
    })

    const [isConversationsMenuOpen, setIsConversationsMenuOpen] = useState<boolean>(true)

    const {loggedIn} = useAppSelector(({user}) => user)

    useEffect(() => {
        const conversationId = searchParams.get('_id') as string;
        if (conversationId) {
            onGetConversationHandler(conversationId)
        } else {
            setActiveConversation({
                _id: '',
                messages: [],
                users: [],
                status: 'active',
                createdAt: null,
                updatedAt: null,
            })
        }

    }, [pathname, searchParams]);

    const onGetConversationHandler = async (_id: string) => {
        try {
            const conversation = await clientAPIRequestGetAConversation(_id);
            setActiveConversation(prevState => ({
                ...prevState,
                //@ts-ignore
                ...conversation?.data?.conversation
            }))

        } catch (error) {

        }
    }




    useEffect(() => {
        if (loggedIn) {
            onGetConversationListHandler()
        }
    }, [loggedIn]);

    useEffect(() => {
        const handleGetPrivateMessage = (messageData: {}) => {
            //@ts-ignore
            setActiveConversation((prevState: IMessengerConversation) => ({
                ...prevState,
                messages: [...(prevState?.messages || []), messageData]
            }))

        };

        socket.on("getPrivateMessage", handleGetPrivateMessage);

        return () => {
            socket.off("getPrivateMessage", handleGetPrivateMessage);
        };
    }, []);

    useEffect(() => {
        if (activeConversation?._id && !hasRun.current) {
            socket.emit("joinConversation", activeConversation?._id);
            hasRun.current = true;
        }
    }, [activeConversation]);

    const onGetConversationListHandler = () => {
        clientAPIRequestGetConversationsList({limit: 10, skip: conversationsList?.length}).then(response => {
            //@ts-ignore
            setConversationsList([
                ...conversationsList,
                //@ts-ignore
                ...(response?.data?.conversationsList || [])
            ])
        })
    }

    const onStartTypingHandler = () => {

    }

    const onDeleteConversationHandler = (conversationId: string) => {
        dispatch(deleteAConversationAction(conversationId))
    }

    const conversationsMenuTriggerHandler = (value: boolean) => {
        setIsConversationsMenuOpen(!isConversationsMenuOpen)
        setActiveConversation({
            _id: '',
            messages: [],
            users: [],
            status: 'active',
            createdAt: null,
            updatedAt: null,
        })
    }

    const onLoadOlderMessages = () => {
        if (!!activeConversation?._id) {
            dispatch(loadOlderMessagesAction({
                limit: 10,
                skip: activeConversation?.messages?.length || 0,
                conversationId: activeConversation?._id,
                messageAreaRef
            }))
        }
    }


    if (!loggedIn) return (
        <div className={'notLoggedInMessage'}>
            <Link href={'/register'} className='notLoggedInMessageLink'>
                You need to create an account in order to access this page
            </Link>
        </div>
    )


    return (
        <div className={`messengerPageContent ${!!activeConversation?._id ? 'messengerPageContentActive' : ''}`}>

            <div className={`conversationsControls ${!!activeConversation?._id ? 'conversationsControlsHidden' : ''}`}>
                <ConversationsControlsHeader/>
                <MessengerConversationsList onGetConversationListHandler={onGetConversationListHandler}
                                            conversationsList={conversationsList}/>
            </div>
            <div className={`conversationArea ${!!activeConversation?._id ? '' : 'conversationAreaHidden' }`}>
                { !!activeConversation?._id &&
                    <>
                        <MessengerHeader autoScroll={autoScroll}
                                         setAutoScroll={setAutoScroll}
                                         activeConversation={activeConversation}/>

                        <MessagingArea onLoadOlderMessages={onLoadOlderMessages}
                                       autoScroll={autoScroll}
                                       setAutoScroll={setAutoScroll}
                                       activeConversation={activeConversation}
                                       messageAreaRef={messageAreaRef}/>

                        <MessengerMultiMediaInputBox dictionary={dictionary}
                                                     onStartTypingHandler={onStartTypingHandler}
                                                     activeConversation={activeConversation}/>
                    </>
                }
            </div>
        </div>
    )
};
export default messengerPageContent
