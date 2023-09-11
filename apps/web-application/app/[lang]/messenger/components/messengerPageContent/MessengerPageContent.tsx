'use client';
import React, {FC, useEffect, useRef, useState} from "react";
import {IPreference} from "../interfaces";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {clientAPIRequestGetAConversation, clientAPIRequestGetConversationsList} from "api-requests";
import socket from 'web-socket-client';
import {useSearchParams, usePathname} from "next/navigation";
import {useIsMobile} from "react-hooker-lib";
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
import {IMessengerConversation} from "typescript-types/dist/src/messengerTypes/IMessengerConversation";
import {headerSizeCalculator} from "custom-util";

interface IProps {
    dictionary: {
        [key: string]: string
    }
}

const messengerPageContent: FC<IProps> = ({dictionary}) => {
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const isMobile = useIsMobile();
    const searchParams = useSearchParams()
    const messageAreaRef = useRef<null | HTMLDivElement>(null)
    const hasRun = useRef(false);

    const [conversationsList, setConversationsList] = useState([])
    const [headerSize, setHeaderSize] = useState(0)
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

    const [preference, setPreference] = useState<IPreference>({
        autoScroll: true,
        isMaximized: false,
    })

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

    const onGetConversationHandler = async (conversationId: string) => {
        try {
            const conversation = await clientAPIRequestGetAConversation({conversationId});
            setActiveConversation(prevState => ({
                ...prevState,
                //@ts-ignore
                ...conversation?.data?.conversation
            }))

        } catch (error) {

        }
    }

    const updatePreference = (key: string, value: any) => {
        setPreference((prevState: IPreference) => {
            const newPreference = {
                ...prevState,
                [key]: value
            }
            localStorage.setItem('messengerPreference', JSON.stringify(newPreference))
            return newPreference
        })
    }

    useEffect(() => {
        const messengerLocalStoragePreference = localStorage.getItem('messengerPreference')
        const preferenceData = messengerLocalStoragePreference ? JSON.parse(messengerLocalStoragePreference) : null
        if (preferenceData) {
            setPreference({
                ...preference,
                ...preferenceData
            })
        }
        if (typeof window !== 'undefined') {

            // document.body.style.overflow = 'hidden';
            //

            const footerWidget = document.querySelector('.footer-widget-area');

            if (footerWidget && footerWidget instanceof HTMLElement) {
                footerWidget.style.display = 'none';
            }

            setTimeout(() => {
                setHeaderSize(headerSizeCalculator())
            }, 0)
        }

        return () => {
            // document.body.style.overflow = 'auto';
            const footerWidget = document.querySelector('.footer-widget-area');
            if (footerWidget && footerWidget instanceof HTMLElement) {
                footerWidget.style.display = 'initial';
            }
        }

    }, []);


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
        <div className={`messengerPageContent`}
             style={{height: `calc(100vh - ${headerSize}px)`}}
        >
            <div className={`conversationsControls ${!!activeConversation?._id ? 'conversationsControlsHidden' : '' }`}
                 style={{
                     // display: !!activeConversation?._id ? 'none' : 'grid',
                 }}>
                <div className={'conversationsControlsHeader'}>
                    <h1> Messages</h1>
                    {/*<button className={`conversationsControlsHeaderButton ControlsHeaderMaximizedButton`}*/}
                    {/*        style={{*/}
                    {/*            color: preference.isMaximized ? 'var(--primary-active-color, #f90)' :*/}
                    {/*                'var(--secondary-text-color, #ccc)'*/}
                    {/*        }}*/}
                    {/*        onClick={() => updatePreference('isMaximized', !preference.isMaximized)}>*/}
                    {/*    <FontAwesomeIcon icon={preference.isMaximized ? faMinimize : faMaximize}/>*/}
                    {/*</button>*/}
                </div>
                <MessengerConversationsList headerSize={headerSize}
                                            onGetConversationListHandler={onGetConversationListHandler}
                                            conversationsList={conversationsList}/>
            </div>

            <div className={`conversationArea ${!!activeConversation?._id ? '' : 'conversationAreaHidden' }`}
                 style={{
                     // gridTemplateRows: preference.isMaximized ?
                     //     `50px calc(100vh - 100px) 50px` :
                     //     `50px calc(100vh - ${headerSize + 100}px) 50px`,
                     gridTemplateRows: preference.isMaximized ?
                         `50px calc(100vh - 100px)` :
                         `50px calc(100vh - ${headerSize + 100}px)`,
                     height:preference.isMaximized ?
                         `calc(100vh - 50px)` :
                         `calc(100vh - ${headerSize + 50}px)`
                 }}>

                <MessengerHeader conversationsMenuTriggerHandler={conversationsMenuTriggerHandler}
                                 autoScroll={autoScroll}
                                 updatePreference={updatePreference}
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
            </div>
        </div>
    )
};
export default messengerPageContent
