import MessengerConversationPreview from "./MessengerConversationPreview/MessengerConversationPreview";
import {IMessengerConversation} from "typescript-types";
import {sortArrayByPropertyOfObject} from 'custom-util';
import {useRouter} from "next/navigation";
import {uniqArrayBy} from "custom-util";
import {FC, useEffect, useRef} from "react";
import {useAppSelector} from "@store/hooks";
import './MessengerConversationsList.styles.scss'

interface IProps {
    onGetConversationListHandler: () => void,
    conversationsList: IMessengerConversation[],
    isMaximized: boolean
    headerSize: number
}

const MessengerConversationsList: FC<IProps> = (
    {
        onGetConversationListHandler,
        conversationsList,
        isMaximized,
        headerSize
    }) => {



    const conversationListRef = useRef<null | HTMLDivElement>(null)
    const prevScrollPosition = useRef(0);
    // const {
    //     activeConversation,
    //     isMaximized,
    // } = useAppSelector(({messenger}) => messenger);
    // const {headerSize} = useAppSelector(({globalState}) => globalState);

    useEffect(() => {
        if (conversationListRef.current) {
            conversationListRef.current.scroll({
                top: 1,
                behavior: 'smooth',
            });
        }

    }, []);


    useEffect(() => {
        //@ts-ignore
        const handleScroll = (event) => {
            const {scrollTop} = event.target;
            prevScrollPosition.current = scrollTop;

            if (scrollTop === 0) {
                onGetConversationListHandler()
                setTimeout(() => {
                    if (conversationListRef.current) {
                        conversationListRef.current.scroll({
                            top: 1,
                            behavior: 'smooth',
                        });
                    }
                }, 500);
            }
        };

        const conversationList = conversationListRef.current;
        conversationList?.addEventListener('scroll', handleScroll);
        return () => conversationList?.removeEventListener('scroll', handleScroll);
    }, [conversationsList]);


    //@ts-ignore
    const renderConversationsPreview = sortArrayByPropertyOfObject(
        uniqArrayBy((conversationsList || []), '_id'),
        'updatedAt',
        'desc'
        //@ts-ignore
    ).map((conversationData: IMessengerConversation) => {
        return <MessengerConversationPreview key={conversationData._id}
                                             conversationData={conversationData}/>
    })

    return (
        <div id={'messengerConversationsList custom-scroll'}
             ref={conversationListRef}
             style={{height: isMaximized ? `calc(100vh - 100px)` : `calc(100vh - ${headerSize + 101}px)`}}>
            {renderConversationsPreview}
            {!conversationsList || conversationsList?.length < 1 ?
                <p className='no-message'>there is no messages yet</p> : null}
        </div>
    );
};
export default MessengerConversationsList;
