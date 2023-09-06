import {getDictionary} from "../../../get-dictionary";
import {i18n} from '../../../i18n-config'
import './page.styles.scss';
import ProfilePageContent from "./components/ProfilePageContent/ProfilePageContent";

interface IProps {
    params: {
        lang: string,
    }
}
//will be deleted after checking if it's needed
const chatroomPage = async ({params: {lang}}: IProps) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);
    // const settingsData = await fetchSettings(['chatroomPageSettings']);

    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main chatroomPage'}>
                <ProfilePageContent dictionary={dictionary}/>
            </main>
        </div>
    )
}

export default chatroomPage;

export const generateMetadata = async () => {
    return {
        title: 'Profile'
    }
}
export const dynamic = 'force-dynamic';