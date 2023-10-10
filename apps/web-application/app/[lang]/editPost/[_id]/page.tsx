import {fetchSettings} from "fetch-requests";
import {getDictionary} from "../../../../get-dictionary";
import './page.scss';
import {i18n} from '@i18nConfig'
import EditPostPageContent from "./components/EditPostPageContent/EditPostPageContent";

interface IProps {
    params: {
        lang: string,
        _id: string
    }
}

const EditPostPage = async ({params: {lang, _id}}: IProps) => {
    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['editPostPageSettings']});
    const sidebar = settingsData?.settings?.editPostPageSettings?.sidebar;

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main editPostPage'}>
                <EditPostPageContent _id={_id} dictionary={dictionary} locale={locale}/>
            </main>
        </div>
    )
}

export default EditPostPage;

export const dynamic = 'force-dynamic';
export const generateMetadata = async () => {
    return {
        title: 'Edit Post',
    }
}