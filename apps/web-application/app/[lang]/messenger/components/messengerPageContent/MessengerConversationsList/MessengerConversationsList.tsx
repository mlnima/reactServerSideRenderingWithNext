import MessengerConversationPreview from "./MessengerConversationPreview/MessengerConversationPreview";
import {IMessengerConversation} from "@repo/typescript-types";
import {sortArrayByPropertyOfObject} from '@repo/shared-util';
import {uniqArrayBy} from "@repo/shared-util";
import {FC, useEffect, useRef} from "react";
import './MessengerConversationsList.styles.scss'

interface IProps {
    onGetConversationListHandler: () => void,
    conversationsList: IMessengerConversation[],
}

const MessengerConversationsList: FC<IProps> = (
    {
        onGetConversationListHandler,
        conversationsList,
    }) => {

    const conversationListRef = useRef<null | HTMLDivElement>(null)
    const prevScrollPosition = useRef(0);

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


   // @ts-ignore
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
        <div id={'messengerConversationsList'}
             className={'custom-scroll'}
             ref={conversationListRef}>
            {renderConversationsPreview}
            {!conversationsList || conversationsList?.length < 1 ?
                <p className='no-message'>there is no messages yet</p> : null}
        </div>
    );
};
export default MessengerConversationsList;
