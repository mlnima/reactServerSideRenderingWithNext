import {fetchChatroomData} from "@lib/fetch-requests/fetchChatrooms";
import {getDictionary} from "../../../../get-dictionary";
import {i18n} from '@i18nConfig'
import './page.styles.scss';
import ChatroomPageContent from "./components/ChatroomPageContent/ChatroomPageContent";
import chatroomMetaGenerator from "./components/chatroomMetaGenerator/chatroomMetaGenerator";
import {PageParams, PageSearchParams} from "@repo/typescript-types";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const chatroomPage = async (props: IProps) => {
    const params = await props.params;

    const {
        lang,
        identifier
    } = params;

    const locale = i18n.locales.includes(lang) ? lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    // const settingsData = await fetchSettings(['chatroomPageSettings']);
    const chatroomsData = await fetchChatroomData({identifier})

    return (
        <div id={'content'} className={`page-no-sidebar`} dir={'ltr'}>
            <main id={'primary'} className={'main chatroom'}>
                <ChatroomPageContent pageData={chatroomsData}  dictionary={dictionary} locale={locale}/>
            </main>
        </div>
    )
}

export default chatroomPage;
export const generateMetadata = chatroomMetaGenerator
export const dynamic = 'force-dynamic';