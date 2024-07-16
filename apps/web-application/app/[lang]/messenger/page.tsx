import {getDictionary} from "../../../get-dictionary";
import {i18n} from '@i18nConfig'
import './page.styles.scss';
import MessengerPageContent from "./components/messengerPageContent/MessengerPageContent";

interface IProps {
    params: {
        lang: string,
        identifier: string,
    }
}

export const generateMetadata = async () => {
    return {
        // alternates: {
        //     canonical: '/messenger',
        //     languages: process.env.NEXT_PUBLIC_LOCALES?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
        //         ?.split(' ').reduce((finalValue:{[key:string]:string},currentLocale)=>{
        //             finalValue[currentLocale] = `/${currentLocale}/messenger`
        //             return finalValue
        //         },{}),
        // },
        title: 'Messenger'
    }
}

const MessengerPage = async ({params: {lang, identifier}}: IProps) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);

    return (
        <div id={'content'} className={`page-no-sidebar messengerPageParent`}>
            <main id={'primary'} className={'main messengerPage'}>
                <MessengerPageContent dictionary={dictionary}/>
            </main>
        </div>
    )
}

export default MessengerPage;