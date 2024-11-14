import { getDictionary } from '../../../get-dictionary';
import './page.scss';
import { i18n } from '@i18nConfig';
import UploadPageContent from './components/UploadPageContent/UploadPageContent';
import {IPageProps} from "@repo/typescript-types";



const uploader = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const {
        lang
    } = params;

    const locale = i18n.locales.includes(lang) ? lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);

    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main uploadPage'}>
                <UploadPageContent
                    _id={searchParams?._id as string}
                    postType={searchParams?.postType as string}
                    dictionary={dictionary}
                    locale={locale}
                />
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
