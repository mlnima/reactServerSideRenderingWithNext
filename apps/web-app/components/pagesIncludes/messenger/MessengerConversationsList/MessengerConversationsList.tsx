import MessengerConversationPreview from "./MessengerConversationPreview/MessengerConversationPreview";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {Styles} from "./MessengerConversationsList.styles";
import {IMessengerConversation} from "typescript-types/src/messengerTypes/IMessengerConversation";
import sortArrayByPropertyOfObject from "custom-util/src/array-utils/sortArrayByPropertyOfObject";
import {uniqArrayBy} from "custom-util";
import {FC, useEffect, useRef} from "react";

interface IProps {
    onSelectConversation: (conversationId: string) => void
    onGetConversationListHandler: () => void
}

const MessengerConversationsList: FC<IProps> = ({onSelectConversation,onGetConversationListHandler}) => {

    const conversationListRef = useRef<null | HTMLDivElement>(null)
    const prevScrollPosition = useRef(0);
    const {conversationsList, isMaximized} = useSelector(({messenger}: Store) => messenger)
    const {headerSize} = useSelector(({globalState}: Store) => globalState);


    useEffect(() => {
        if (conversationListRef.current) {
            conversationListRef.current.scroll({
                top: 1,
                behavior: 'smooth',
            });
        }

    }, []);


    useEffect(() => {
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
        'asc'
    ).map((conversationData: IMessengerConversation) => {
        return <MessengerConversationPreview key={conversationData._id}
                                             onSelectConversation={onSelectConversation}
                                             conversationData={conversationData}/>
    })

    return (
        <Styles className={'messenger-conversations-list custom-scroll'}
                ref={conversationListRef}
                isMaximized={isMaximized}
                headerSize={headerSize + 50}>
            {renderConversationsPreview}
            {renderConversationsPreview}
            {renderConversationsPreview}
            {renderConversationsPreview}
            {renderConversationsPreview}
            {renderConversationsPreview}
            {renderConversationsPreview}
            {renderConversationsPreview}
            {renderConversationsPreview}
            {renderConversationsPreview}
            {renderConversationsPreview}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {!conversationsList || conversationsList?.length < 1 ?
                <p className='no-message'>there is no messages yet</p> : null}
        </Styles>
    );
};
export default MessengerConversationsList;
