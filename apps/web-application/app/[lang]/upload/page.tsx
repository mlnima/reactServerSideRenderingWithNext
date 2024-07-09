import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { getDictionary } from '../../../get-dictionary';
import './page.scss';
import { i18n } from '@i18nConfig';
import UploadPageContent from './components/UploadPageContent/UploadPageContent';

interface IProps {
    params: {
        lang: string;
        _id: string;
    };
}

const uploader = async ({ params: { lang, _id }, searchParams }: IProps) => {
    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    // const settingsData = await fetchSettings({ requireSettings: ['editPostPageSettings'] });
    // const sidebar = settingsData?.settings?.uploaderPageSettings?.sidebar;

    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main uploadPage'}>
                <UploadPageContent _id={searchParams?._id}
                                   postType={searchParams?.postType}
                                   dictionary={dictionary}
                                   locale={locale} />
            </main>
        </div>
    );
};

export default uploader;

export const dynamic = 'force-dynamic';
export const generateMetadata = async () => {
    return {
        title: 'Edit Post',
    };
};
