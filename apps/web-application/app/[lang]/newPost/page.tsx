import {getDictionary} from "../../../get-dictionary";
import {i18n} from '../../../i18n-config'
import './page.styles.scss';
import NewPostPageContent from "./components/NewPostPageContent";


interface IProps {
    params: {
        lang: string,
    },
    searchParams: {
        postType: string
    }
}


const NewPostPage = async ({params: {lang}, searchParams: {postType}}: IProps) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);


    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main newPostPage'}>
                <NewPostPageContent postType={postType} dictionary={dictionary}/>
            </main>
        </div>
    )
}

export default NewPostPage;

export const dynamic = 'force-dynamic';