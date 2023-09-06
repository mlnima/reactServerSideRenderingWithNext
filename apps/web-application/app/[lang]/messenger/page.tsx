// import {fetchChatroomData} from "fetch-requests";
import {getDictionary} from "../../../get-dictionary";
import {i18n} from '../../../i18n-config'
import './page.styles.scss';
import MessengerPageContent from "./components/messengerPageContent/MessengerPageContent";

// import chatroomMetaGenerator from "./components/chatroomMetaGenerator/chatroomMetaGenerator";

interface IProps {
    params: {
        lang: string,
        identifier: string,
    }
}

export const generateMetadata = async () => {
    return {
        title: 'Messenger'
    }
}

const MessengerPage = async ({params: {lang, identifier}}: IProps) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);
    // const settingsData = await fetchSettings(['chatroomPageSettings']);
    // const chatroomsData = await fetchChatroomData({identifier})

    return (
        <div id={'content'} className={`page-no-sidebar inner-content`}>
            <main id={'primary'} className={'main messengerPage'}>
                <MessengerPageContent dictionary={dictionary}/>
            </main>
        </div>
    )
}

export default MessengerPage;