import {getDictionary} from "../../../get-dictionary";
import {i18n} from '@i18nConfig'
import './page.styles.scss';
import NewPostPageContent from "./components/NewPostPageContent";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";


interface IProps {
    params: {
        lang: string,
    },
    searchParams: {
        postType: string
    }
}


export const generateMetadata = async ({params: {lang}, searchParams}: IProps) => {
    return {

        title: 'Messenger'
    }
}

const NewPostPage = async ({params: {lang}, searchParams}: IProps) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);

    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main newPostPage'}>
                <NewPostPageContent dictionary={dictionary} locale={locale}/>
            </main>
        </div>
    )
}

export default NewPostPage;

export const dynamic = 'force-dynamic';