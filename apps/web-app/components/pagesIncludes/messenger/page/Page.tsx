import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {Styles} from "@components/pagesIncludes/messenger/page/Styles";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {useAppDispatch} from "@store_toolkit/hooks";
import {useIsMobile} from "react-hooker-lib";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import MessengerConfigs from "@components/pagesIncludes/messenger/MessengerConfigs/MessengerConfigs";
import MessengerConversationsList
    from "@components/pagesIncludes/messenger/MessengerConversationsList/MessengerConversationsList";
import MessengerHeader from "@components/pagesIncludes/messenger/MessengerHeader/MessengerHeader";
import MessagingArea from "@components/pagesIncludes/messenger/MessagingArea/MessagingArea";
import Link from "next/link";
import MessengerMultiMediaInputBox
    from "@components/pagesIncludes/messenger/MessengerMultiMediaInputBox/MessengerMultiMediaInputBox";
import {socket} from "custom-util";
import {
    cleanActiveConversation,
    newMessageInActiveConversation, setDraftMessageData, setMessengerState,
} from "@store_toolkit/clientReducers/messengerReducer";
import {deleteAConversationAction} from "@store_toolkit/clientReducers/messengerActions/deleteAConversation";
import {useRouter} from "next/router";
import headerSizeCalculator from "custom-util/src/vanilla-ui-utils/headerSizeCalculator";
import {IMessengerConversation} from "typescript-types/src/messengerTypes/IMessengerConversation";
import {
    clientAPIRequestLoadOlderMessages,
    clientAPIRequestGetConversationsList,
    clientAPIRequestGetAConversation
} from "api-requests";
import {getAConversationAction} from "@store_toolkit/clientReducers/messengerActions/getAConversationAction";
import {loadOlderMessagesAction} from "@store_toolkit/clientReducers/messengerActions/loadOlderMessagesAction";
import {getHeaderSizeAction} from "@store_toolkit/clientReducers/globalStateReducer";

interface IProps {

}

const Page: FC<IProps> = ({}) => {
    //hooks
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isMobile = useIsMobile();

    const [conversationsList, setConversationsList] = useState([])
    //const [activeConversation, setActiveConversation] = useState<IMessengerConversation | null>(null)
    const [audioMessage, setAudioMessage] = useState<string>('')
    const [imageMessage, setImageMessage] = useState<string>('')
    const [textMessage, setTextMessage] = useState('')
    const messageAreaRef = useRef<null | HTMLDivElement>(null)
    //refs
    const imageInputRef = useRef<HTMLInputElement>(null);
    const hasRun = useRef(false);
    //storeContent
    const {loggedIn, userData} = useSelector(({user}: Store) => user)

    const {
        activeConversation,
        isMaximized,
        isConversationsMenuOpen,
        draftMessage,
    } = useSelector(({messenger}: Store) => messenger);


    const isActiveConversation = useMemo(() => !!activeConversation?._id, [activeConversation?._id]);

    useEffect(() => {
        onGetConversationListHandler()
    }, [loggedIn]);

    useEffect(() => {
        const handleGetPrivateMessage = (messageData) => {
            console.log('console=> ', messageData)
            dispatch(newMessageInActiveConversation(messageData));
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            dispatch(getHeaderSizeAction(0))
        }
    }, [isMobile, router]);

    useEffect(() => {
        const conversationId = router.query._id as string
        if (conversationId) {
            onGetConversationHandler(conversationId)
        }
    }, [router]);
    const onGetConversationHandler = async (conversationId: string) => {
        try {
            dispatch(getAConversationAction({conversationId}))
            // await clientAPIRequestGetAConversation({conversationId}).then(response => {
            //     //@ts-ignore
            //     setActiveConversation(response?.data?.conversation)
            // })
        } catch (error) {
            console.log('onGetConversationHandler=> ',)
        }
    }
    const onGetConversationListHandler = () => {
        if (loggedIn) {
            clientAPIRequestGetConversationsList({limit: 10, skip: conversationsList?.length}).then(response => {
                //@ts-ignore
                setConversationsList([
                    ...conversationsList,
                    //@ts-ignore
                    ...(response?.data?.conversationsList || [])
                ])
            })
        }
    }
    const onStartTypingHandler = () => {

    }
    const onDeleteConversationHandler = (conversationId) => {
        dispatch(deleteAConversationAction(conversationId))
    }
    const onSelectConversation = (conversationId) => {
        router.push(`/messenger?_id=${conversationId}`)
    }
    const conversationsMenuTriggerHandler = (value: boolean) => {
        dispatch(setMessengerState({isConversationsMenuOpen: !isConversationsMenuOpen}))
        dispatch(cleanActiveConversation(null))
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

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if (userData?._id && activeConversation?._id) {
            const messageData = {
                content: draftMessage.textContent,
                imageContent: draftMessage.imageContent,
                audioContent: draftMessage.audioContent,
                createdAt: Date.now(),
                sender: userData._id,
                conversation: activeConversation._id
            }
            socket.emit('sendPrivateMessage', messageData)

            setTimeout(() => {
                dispatch(setDraftMessageData({
                    imageContent: '',
                    videoContent: '',
                    audioContent: '',
                    textContent: '',
                }))
            }, 500)

        }
    }

    return (
        <Styles isConversationsMenuOpen={isConversationsMenuOpen}
            //@ts-ignore
                isActiveConversation={!!activeConversation?._id}
                id={'full-width-content'}
                isMaximized={isMaximized}
                className={'messenger-page main'}>

            <HeadSetter title={'Messenger'}/>

            {loggedIn &&
                <div className={'inner-content'}>

                    <div className={'conversations-controls'}>

                        {isConversationsMenuOpen &&
                            <MessengerConfigs/>
                        }
                        {isConversationsMenuOpen &&
                            <MessengerConversationsList onSelectConversation={onSelectConversation}
                                                        onGetConversationListHandler={onGetConversationListHandler}
                                                        conversationsList={conversationsList}/>
                        }
                    </div>

                    <div className={'messaging'}>

                        <MessengerHeader conversationsMenuTriggerHandler={conversationsMenuTriggerHandler}/>
                        <MessagingArea onLoadOlderMessages={onLoadOlderMessages} messageAreaRef={messageAreaRef}/>
                        <MessengerMultiMediaInputBox
                            textMessage={textMessage}
                            setTextMessage={setTextMessage}
                            imageMessage={imageMessage}
                            setImageMessage={setImageMessage}
                            audioMessage={audioMessage}
                            setAudioMessage={setAudioMessage}
                            onStartTypingHandler={onStartTypingHandler}
                            imageInputRef={imageInputRef}
                            isActive={!!activeConversation?._id}
                            onSubmitHandler={onSubmitHandler}/>
                    </div>
                </div>
            }
            {!loggedIn &&
                <div className={'inner-content-not-logged-in'}>
                    <Link href={'/register'} className='messenger-page-register-page-link'>
                        You need to create an account in order to access this page
                    </Link>
                </div>
            }
        </Styles>
    )
};
export default Page
